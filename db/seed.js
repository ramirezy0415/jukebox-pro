import { faker } from "@faker-js/faker";
import db from "#db/client";

import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const user1 = await createUser(
    faker.internet.username(),
    faker.internet.password()
  );

  const user2 = await createUser(
    faker.internet.username(),
    faker.internet.password()
  );

  const user3 = await createUser(
    faker.internet.username(),
    faker.internet.password()
  );

  for (let i = 1; i <= 20; i++) {
    await createPlaylist("Playlist " + i, "lorem ipsum playlist description");
    await createTrack("Track " + i, i * 50000);
  }

  for (let i = 1; i <= 15; i++) {
    const playlistId = 1 + Math.floor(i / 2);
    await createPlaylistTrack(playlistId, i, user1.id);
    await createPlaylistTrack(playlistId, i, user2.id);
    await createPlaylistTrack(playlistId, i, user3.id);
  }
}
