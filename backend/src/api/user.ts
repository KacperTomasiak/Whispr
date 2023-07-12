import { connection } from "./database";

type User = {
  privateKey: string;
  username: string;
};

let user: User = {
  privateKey: "",
  username: "",
};

const getData = (privateKey: string): void => {
  connection.query(
    `SELECT * from whispr.users WHERE private_key = "${privateKey}"`,
    (err, result) => {
      if (err) throw err;
      user.privateKey = result[0].private_key;
      user.username = result[0].username;
    }
  );
};

export { user, getData };
