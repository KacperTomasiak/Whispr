import { connection } from "../database/database";
import { User } from "../types/types";
import { deletePersonalFolder } from "../services/media";

let user: User = {
  privateKey: "",
  username: "",
  accountAge: 0,
  numberOfSessions: 0,
  sessions: [],
};

const getData = (privateKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT private_key, username, DATEDIFF(NOW(), registration_date) AS days FROM whispr.users WHERE private_key = "${privateKey}"`,
      (err, result) => {
        if (err) reject(err);
        user.privateKey = result[0].private_key;
        user.username = result[0].username;
        user.accountAge = Number(result[0].days);
        connection.query(
          `SELECT session FROM whispr.sessions WHERE private_key = "${privateKey}"`,
          (err, result) => {
            if (err) reject(err);
            let length: number = result.length;
            if (length > 0) {
              user.sessions = [];
              for (let i: number = 0; i < length; i++) {
                user.sessions[i] = result[i].session;
              }
            } else {
              user.sessions = [];
            }
            connection.query(
              `SELECT COUNT(session) AS num FROM whispr.sessions WHERE private_key = "${privateKey}"`,
              (err, result) => {
                if (err) reject(err);
                user.numberOfSessions = result[0].num;
                resolve();
              }
            );
          }
        );
      }
    );
  });
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
    `SELECT * FROM whispr.sessions WHERE session = "${session}" AND private_key = "${privateKey}"`,
    (err, result) => {
      if (err) throw err;
      if (result.length == 0) {
        connection.query(
          `INSERT INTO whispr.sessions VALUES ("${session}", "${privateKey}")`,
          (err) => {
            if (err) throw err;
          }
        );
      }
    }
  );
};

const leaveSession = (privateKey: string, session: string): void => {
  connection.query(
    `DELETE FROM whispr.sessions WHERE session = "${session}" AND private_key = "${privateKey}"`,
    (err) => {
      if (err) throw err;
    }
  );
};

const deleteAccount = (privateKey: string): void => {
  connection.query(
    `DELETE FROM whispr.users WHERE private_key = "${privateKey}"`,
    (err) => {
      if (err) throw err;
      connection.query(
        `DELETE FROM whispr.sessions WHERE private_key = "${privateKey}"`,
        (err) => {
          if (err) throw err;
          connection.query(
            `DELETE FROM whispr.messages WHERE private_key = "${privateKey}"`,
            (err) => {
              if (err) throw err;
              deletePersonalFolder(privateKey);
            }
          );
        }
      );
    }
  );
};

export {
  user,
  getData,
  changeUsername,
  joinSession,
  leaveSession,
  deleteAccount,
};
