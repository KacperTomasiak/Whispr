import * as express from "express";
import * as cors from "cors";
import * as http from "http";
import * as fileUpload from "express-fileupload";
import { Server, Socket } from "socket.io";
import { createDatabase, createTables } from "./database/database";
import { createMediaFolder } from "./services/media";
import { router } from "./router/routes";

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
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(cors());
app.use(router);

io.on("connection", (socket: Socket): void => {
  console.log("Connected");
  socket.on("session", (session: string): void => {
    io.emit("data", session);
  });
  socket.on("change", (value: boolean): void => {
    io.emit("change", value);
  });
  socket.on("disconnect", (): void => {
    console.log("Disconnected");
  });
});

server.listen(port, (): void => {
  createDatabase();
  createTables();
  createMediaFolder();
});
