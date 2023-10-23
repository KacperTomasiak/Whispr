import * as express from "express";
import { authenticateUser } from "../models/login";
import {
  user,
  getData,
  changeUsername,
  joinSession,
  leaveSession,
  deleteAccount,
} from "../models/user";
import {
  getMessage,
  sendMessage,
  editMessage,
  deleteMessage,
} from "../models/messages";

const router = express.Router();

router.post("/login", async (req, res): Promise<void> => {
  let privateKey: string = req.body.privateKey;
  let result: boolean = await authenticateUser(privateKey);
  if (result == true) {
    getData(privateKey);
    res.status(200).send("OK");
  } else {
    res.status(500).send("Error");
  }
});

router.get("/user/:key", async (req, res): Promise<void> => {
  let privateKey: string = req.params.key;
  await getData(privateKey);
  res.send(JSON.stringify(user));
});

router.put("/change-username", (req, res): void => {
  let privateKey: string = req.body.privateKey;
  let username: string = req.body.username;
  changeUsername(privateKey, username);
  res.end();
});

router.post("/join-session", (req, res): void => {
  let privateKey: string = req.body.privateKey;
  let session: string = req.body.session;
  joinSession(privateKey, session);
  res.end();
});

router.delete("/leave-session", (req, res): void => {
  let privateKey: string = req.body.privateKey;
  let session: string = req.body.session;
  leaveSession(privateKey, session);
  res.end();
});

router.post("/send-message", (req, res): void => {
  let privateKey: string = req.body.privateKey;
  let session: string = req.body.session;
  let message: string = req.body.message;
  let reference: number = req.body.reference;
  sendMessage(privateKey, session, message, reference);
  res.end();
});

router.post("/get-message", async (req, res): Promise<void> => {
  let session: string = req.body.session;
  let result: JSON = await getMessage(session);
  res.send(result);
});

router.put("/edit-message", (req, res): void => {
  let id: number = req.body.id;
  let session: string = req.body.session;
  let message: string = req.body.message;
  editMessage(id, session, message);
  res.end();
});

router.delete("/delete-message", (req, res): void => {
  let id: number = req.body.id;
  deleteMessage(id);
  res.end();
});

router.delete("/delete-account", (req, res): void => {
  let privateKey: string = req.body.privateKey;
  deleteAccount(privateKey);
  res.end();
});

export { router };
