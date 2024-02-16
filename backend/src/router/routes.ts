import * as express from "express";
import * as path from "path";
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
  getLatestId,
  getMessage,
  sendMessage,
  editMessage,
  deleteMessage,
} from "../models/messages";
import { readAndMoveFile } from "../services/media";

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
  let attachments: string[] = req.body.attachments;
  sendMessage(privateKey, session, message, reference, attachments);
  res.end();
});

router.post("/upload-files", async (req, res): Promise<void> => {
  let privateKey: string = req.body.privateKey;
  let id: number = await getLatestId(privateKey);
  let files: any = req.files.files;
  if (files.length > 1) {
    for (let file of files) {
      readAndMoveFile(privateKey, id, file);
    }
  } else {
    readAndMoveFile(privateKey, id, files);
  }
  res.end();
});

router.get("/download-file/:key/:id/:file", (req, res): void => {
  let privateKey: string = req.params.key;
  let id: number = req.params.id;
  let file: string = req.params.file;
  res.download(path.join(__dirname, `../../media/${privateKey}/${id}/${file}`));
});

router.get("/get-message/:session", async (req, res): Promise<void> => {
  let session: string = req.params.session;
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
  let privateKey: string = req.body.privateKey;
  let id: number = req.body.id;
  deleteMessage(privateKey, id);
  res.end();
});

router.delete("/delete-account", (req, res): void => {
  let privateKey: string = req.body.privateKey;
  deleteAccount(privateKey);
  res.end();
});

export { router };
