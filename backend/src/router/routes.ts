import * as express from "express";
import {
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
} from "../controllers/controllers";

const router = express.Router();

router.post("/login", logInController);

router.get("/user/:key", getUserController);

router.put("/change-username", changeUsernameController);

router.post("/join-session", joinSessionController);

router.delete("/leave-session", leaveSessionController);

router.post("/send-message", sendMessageController);

router.post("/upload-files", uploadFilesController);

router.get("/download-file/:id/:file", downloadFileController);

router.get("/get-message/:session", getMessageController);

router.put("/edit-message", editMessageController);

router.delete("/delete-message", deleteMessageController);

router.delete("/delete-account", deleteAccountController);

export { router };
