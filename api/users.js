import express from "express";
const usersRouter = express.Router();
export default usersRouter;

import requireBody from "#middleware/requireBody";
import { createUser, getUser } from "#db/queries/users";
import { createToken } from "#utils/jwt";

usersRouter.post(
  "/register",
  requireBody(["username", "password"]),
  async (req, res) => {
    try {
      const { username, password } = req.body;
      const registeredUser = await createUser(username, password);

      if (!registeredUser) {
        return res.status(500).json({ error: "Unable to insert user" });
      }

      const token = createToken({ id: registeredUser.id });
      return res.status(201).json(token);
    } catch (error) {
      console.error(error);
    }
  }
);

usersRouter.post(
  "/login",
  requireBody(["username", "password"]),
  async (req, res) => {
    try {
      const { username, password } = req.body;
      const userInfo = await getUser(username, password);

      if (!userInfo) {
        return res.status(401).json({ error: "Invalid user credentials" });
      }

      const token = createToken({ id: userInfo.id });
      return res.status(200).json(token);
    } catch (error) {
      console.error(error);
    }
  }
);
