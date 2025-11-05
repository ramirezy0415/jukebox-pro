import bcrypt from "bcrypt";
import db from "#db/client";

export async function createUser(username, password) {
  try {
    const query = `
    INSERT INTO users(username, password)
    VALUES ($1, $2)
    RETURNING *;
    `;

    const hashedPassword = await bcrypt.hash(password, 10);
    const values = [username, hashedPassword];
    const {
      rows: [user],
    } = await db.query(query, values);
    return user;
  } catch (error) {
    console.error("Error in createUser: ", error);
  }
}
