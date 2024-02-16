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
  getPrivateKey,
  getMessage,
  sendMessage,
  editMessage,
  deleteMessage,
} from "../models/messages";
import { readAndMoveFile } from "../services/media";

const logInController = async (req, res): Promise<void> => {
  let privateKey: string = req.body.privateKey;
  let result: boolean = await authenticateUser(privateKey);
  if (result == true) {
    getData(privateKey);
    res.status(200).send("OK");
  } else {
    res.status(500).send("Error");
  }
};

const getUserController = async (req, res): Promise<void> => {
  let privateKey: string = req.params.key;
  await getData(privateKey);
  res.send(JSON.stringify(user));
};

const changeUsernameController = (req, res): void => {
  let privateKey: string = req.body.privateKey;
  let username: string = req.body.username;
  changeUsername(privateKey, username);
  res.end();
};

const joinSessionController = (req, res): void => {
  let privateKey: string = req.body.privateKey;
  let session: string = req.body.session;
  joinSession(privateKey, session);
  res.end();
};

const leaveSessionController = (req, res): void => {
  let privateKey: string = req.body.privateKey;
  let session: string = req.body.session;
  leaveSession(privateKey, session);
  res.end();
};

const sendMessageController = (req, res): void => {
  let privateKey: string = req.body.privateKey;
  let session: string = req.body.session;
  let message: string = req.body.message;
  let reference: number = req.body.reference;
  let attachments: string[] = req.body.attachments;
  sendMessage(privateKey, session, message, reference, attachments);
  res.end();
};

const uploadFilesController = async (req, res): Promise<void> => {
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
};

const downloadFileController = async (req, res): Promise<void> => {
  let id: number = req.params.id;
  let privateKey: string = await getPrivateKey(id);
  let file: string = req.params.file;
  res.download(path.join(__dirname, `../../media/${privateKey}/${id}/${file}`));
};

const getMessageController = async (req, res): Promise<void> => {
  let session: string = req.params.session;
  let result: JSON = await getMessage(session);
  res.send(result);
};

const editMessageController = (req, res): void => {
  let id: number = req.body.id;
  let session: string = req.body.session;
  let message: string = req.body.message;
  editMessage(id, session, message);
  res.end();
};

const deleteMessageController = (req, res): void => {
  let privateKey: string = req.body.privateKey;
  let id: number = req.body.id;
  deleteMessage(privateKey, id);
  res.end();
};

const deleteAccountController = (req, res): void => {
  let privateKey: string = req.body.privateKey;
  deleteAccount(privateKey);
  res.end();
};

export {
  logInController,
  getUserController,
  changeUsernameController,
  joinSessionController,
  leaveSessionController,
  sendMessageController,
  uploadFilesController,
  downloadFileController,
  getMessageController,
  editMessageController,
  deleteMessageController,
  deleteAccountController,
};
