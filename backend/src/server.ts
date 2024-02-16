const express = require("express");
const app = express();
const port: number | string = 3000 || process.env.PORT;
const database = require("./api/database");
const login = require("./api/login");
const cors = require("cors");

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.listen(port, (): void => {
  database.createDatabase();
  database.createTable();
});

app.post("/login", async (req, res): Promise<void> => {
  let privateKey: string = req.body.privateKey;
  let result: boolean = await login.authenticateUser(privateKey);
  if (result == true) {
    res.status(200).send("OK");
  } else {
    res.status(500).send("Error");
  }
});

export { database };
