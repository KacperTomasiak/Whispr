import * as express from "express";
import * as cors from "cors";
import { createDatabase, createTable } from "./api/database";
import { authenticateUser } from "./api/login";
import { user, getData, changeUsername } from "./api/user";

const app = express();
const port: number | string = 3000 || process.env.PORT;

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.listen(port, (): void => {
  createDatabase();
  createTable();
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

app.get("/logout", (req, res): void => {
  user.privateKey = "";
  user.username = "";
  res.end();
});
