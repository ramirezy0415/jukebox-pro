import express from "express";
const router = express.Router();
export default router;

import {
  getTracks,
  getTrackById,
  getPlaylistByTrack,
} from "#db/queries/tracks";
import requireUser from "#middleware/requireUser";

router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.get("/:id", async (req, res) => {
  const track = await getTrackById(req.params.id);
  if (!track) return res.status(404).send("Track not found.");
  res.send(track);
});

router.get("/:id/playlists", requireUser, async (req, res) => {
  if (req.user.id !== req.tracks.user_id) {
    return res.status(403).json({ error: "Unauthorized User" });
  }

  const { id } = req.params;
  const track = await getPlaylistByTrack(id, req.tracks.user_id);
  if (!track) return res.status(404).send("Track not found.");
  res.status(200).send(track);
});
