import express from "express";
const router = express.Router();
export default router;

import {
  getTracks,
  getTrackById,
  getTracksPlaylists,
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
  const playlists = await getTracksPlaylists(req.params.id);

  if (playlists.length === 0) {
    return res.status(404).send("Track not found.");
  }

  if (playlists.user_id != req.user.id) {
    return res.status(403).send("User is not owner of playlist");
  }

  res.status(200).send(playlists);
});
