import { connection } from "./database";

type User = {
  privateKey: string;
  username: string;
  accountAge: number;
};

let user: User = {
  privateKey: "",
  username: "",
  accountAge: 0,
};

const getData = (privateKey: string): void => {
  connection.query(
    `SELECT private_key, username, DATEDIFF(NOW(), registration_date) AS days FROM whispr.users WHERE private_key = "${privateKey}"`,
    (err, result) => {
      if (err) throw err;
      user.privateKey = result[0].private_key;
      user.username = result[0].username;
      user.accountAge = Number(result[0].days);
    }
  );
};

const changeUsername = (privateKey: string, username: string): void => {
  connection.query(
    `UPDATE whispr.users SET username = "${username}" WHERE private_key = "${privateKey}"`,
    (err) => {
      if (err) throw err;
    }
  );
};

export { user, getData, changeUsername };
