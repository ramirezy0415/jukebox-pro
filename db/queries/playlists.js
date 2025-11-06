import db from "#db/client";

export async function createPlaylist(name, description) {
  const sql = `
  INSERT INTO playlists
    (name, description)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [name, description]);
  return playlist;
}

export async function getPlaylists(user_id) {
  const sql = `
  SELECT *
  FROM playlists
  LEFT JOIN playlist_tracks
    ON playlist_tracks.playlist_id = playlists.id
  WHERE playlist_tracks.user_id = $1
  `;
  const values = [user_id];
  const { rows: playlists } = await db.query(sql, values);
  return playlists;
}

export async function getPlaylistById(id) {
  const sql = `
  SELECT *
  FROM playlists
  WHERE id = $1
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [id]);
  return playlist;
}
