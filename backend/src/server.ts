import * as express from "express";
import * as cors from "cors";
import { createDatabase, createTables } from "./api/database";
import { authenticateUser } from "./api/login";
import { user, getData, changeUsername, joinSession } from "./api/user";
import { sendMessage } from "./api/messages";

const app = express();
const port: number | string = 3000 || process.env.PORT;

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.listen(port, (): void => {
  createDatabase();
  createTables();
});

app.post("/login", async (req, res): Promise<void> => {
  user.privateKey = req.body.privateKey;
  let result: boolean = await authenticateUser(user.privateKey);
  if (result == true) {
    getData(user.privateKey);
    res.status(200).send("OK");
  } else {
    res.status(500).send("Error");
  }
});

app.get("/user", (req, res): void => {
  if (user.privateKey != "") getData(user.privateKey);
  res.send(JSON.stringify(user));
});

app.post("/change-username", (req, res): void => {
  changeUsername(user.privateKey, req.body.username);
  res.end();
});

app.post("/join-session", (req, res): void => {
  let session: string = req.body.session;
  joinSession(user.privateKey, session);
  res.end();
});

app.post("/send-message", (req, res): void => {
  let privateKey: string = req.body.privateKey;
  let session: string = req.body.session;
  let message: string = req.body.message;
  sendMessage(privateKey, session, message);
  res.end();
});

app.get("/logout", (req, res): void => {
  user.privateKey = "";
  user.username = "";
  user.accountAge = 0;
  user.numberOfSessions = 0;
  user.sessions = [];
  res.end();
});
