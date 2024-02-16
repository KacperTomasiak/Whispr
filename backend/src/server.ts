import * as express from "express";
import * as cors from "cors";
import * as http from "http";
import { Server, Socket } from "socket.io";
import { createDatabase, createTables } from "./api/database";
import { authenticateUser } from "./api/login";
import {
  user,
  getData,
  changeUsername,
  joinSession,
  leaveSession,
  deleteAccount,
} from "./api/user";
import { getMessage, sendMessage } from "./api/messages";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const port: number | string = 3000 || process.env.PORT;

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

io.on("connection", (socket: Socket): void => {
  console.log("Connected");
  socket.on("session", (session: string): void => {
    io.emit("data", session);
  });
  socket.on("disconnect", (): void => {
    console.log("Disconnected");
  });
});

server.listen(port, (): void => {
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

app.get("/user/:key", async (req, res): Promise<void> => {
  let privateKey: string = req.params.key;
  await getData(privateKey);
  res.send(JSON.stringify(user));
});

app.put("/change-username", (req, res): void => {
  let privateKey: string = req.body.privateKey;
  let username: string = req.body.username;
  changeUsername(privateKey, username);
  res.end();
});

app.post("/join-session", (req, res): void => {
  let privateKey: string = req.body.privateKey;
  let session: string = req.body.session;
  joinSession(privateKey, session);
  res.end();
});

app.delete("/leave-session", (req, res): void => {
  let privateKey: string = req.body.privateKey;
  let session: string = req.body.session;
  leaveSession(privateKey, session);
  res.end();
});

app.post("/send-message", (req, res): void => {
  let privateKey: string = req.body.privateKey;
  let session: string = req.body.session;
  let message: string = req.body.message;
  sendMessage(privateKey, session, message);
  res.end();
});

app.post("/get-message", async (req, res): Promise<void> => {
  let session: string = req.body.session;
  let result: JSON = await getMessage(session);
  res.send(result);
});

app.delete("/delete-account", async (req, res): Promise<void> => {
  let privateKey: string = req.body.privateKey;
  deleteAccount(privateKey);
  res.end();
});
