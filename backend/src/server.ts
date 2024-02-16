import * as express from "express";
import * as cors from "cors";
import { createDatabase, createTables } from "./api/database";
import { authenticateUser } from "./api/login";
import { user, getData, changeUsername, joinSession } from "./api/user";

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
  let privateKey: string = req.body.privateKey;
  let result: boolean = await authenticateUser(privateKey);
  if (result == true) {
    getData(privateKey);
    res.status(200).send("OK");
  } else {
    res.status(500).send("Error");
  }
});

app.get("/user", (req, res): void => {
  res.send(JSON.stringify(user));
});

app.post("/change-username", (req, res): void => {
  changeUsername(user.privateKey, req.body.username);
  getData(user.privateKey);
  res.end();
});

app.post("/join-session", (req, res): void => {
  let session: string = req.body.session;
  joinSession(user.privateKey, session);
});

app.get("/logout", (req, res): void => {
  user.privateKey = "";
  user.username = "";
  user.accountAge = 0;
  user.sessions = [];
  res.end();
});
