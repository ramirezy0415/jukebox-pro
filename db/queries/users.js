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

export async function getUser(username, password) {
  try {
    const query = `
    SELECT *
    FROM users
    WHERE username = $1;`;
    const values = [username];
    const {
      rows: [user],
    } = await db.query(query, values);

    // If no users with the provided username
    if (!user) {
      return null;
    }

    // Check if the password matches the one passed in
    const correctPassword = bcrypt.compare(password, user.password);
    // If not correct password
    if (!correctPassword) {
      return null;
    }

    // If correct password
    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserById(id) {
  try {
    const query = `SELECT * FROM users WHERE id = $1`;
    const {
      rows: [user],
    } = await db.query(query, [id]);

    return user;
  } catch (error) {
    console.error(error);
  }
}
