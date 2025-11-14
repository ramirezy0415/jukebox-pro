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

export async function getPlaylistUserInfo(playlist_id, user_id) {
  const sql = `
  SELECT * FROM playlists_tracks WHERE playlist_id = $1 AND user_id = $2
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [playlist_id, user_id]);
  return playlist;
}
