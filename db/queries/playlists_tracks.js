import db from "#db/client";

export async function createPlaylistTrack(playlistId, trackId, userId) {
  const sql = `
  INSERT INTO playlists_tracks
    (playlist_id, track_id, user_id)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [playlistTrack],
  } = await db.query(sql, [playlistId, trackId, userId]);
  return playlistTrack;
}
