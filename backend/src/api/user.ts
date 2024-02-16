import { connection } from "./database";

type User = {
  privateKey: string;
  username: string;
  accountAge: number;
  sessions: string[];
};

let user: User = {
  privateKey: "",
  username: "",
  accountAge: 0,
  sessions: [],
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

const joinSession = (privateKey: string, session: string): void => {
  connection.query(
    `SELECT * FROM whispr.sessions WHERE session = "${session}"`,
    (err, result) => {
      if (err) throw err;
      if (result.length == 0) {
        connection.query(
          `INSERT INTO whispr.sessions VALUES ("${session}", "${privateKey}")`,
          (err) => {
            if (err) throw err;
          }
        );
        user.sessions.push(session);
      }
    }
  );
};

export { user, getData, changeUsername, joinSession };
