import { connection } from "./database";
import { encrypt, decrypt } from "./encryption";

const sendMessage = (
  privateKey: string,
  session: string,
  message: string
): void => {
  const ciphertext: string = encrypt(session, message);
  connection.query(
    `INSERT INTO whispr.messages VALUES ("${session}", "${privateKey}", "${ciphertext}", UTC_TIMESTAMP())`,
    (err) => {
      if (err) throw err;
    }
  );
};

const getMessage = async (session: string): Promise<JSON> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT session, messages.private_key AS privateKey, username, message, ` +
        `CONVERT_TZ(message_time, "+00:00", @@session.time_zone) AS messageTime FROM ` +
        `whispr.messages INNER JOIN whispr.users ON users.private_key = messages.private_key WHERE ` +
        `session = "${session}" ORDER BY message_time DESC`,
      (err, result) => {
        if (err) throw err;
        for (let i: number = 0; i < result.length; i++) {
          result[i].message = decrypt(session, result[i].message);
        }
        resolve(JSON.parse(JSON.stringify(result)));
      }
    );
  });
};

const editMessage = async (
  privateKey: string,
  session: string,
  message: string,
  messageTime: string
): Promise<void> => {
  connection.query(
    `UPDATE whispr.messages SET message = "${encrypt(
      session,
      message
    )}" WHERE session = "${session}" AND private_key = "${privateKey}" AND message_time = "${messageTime}"`,
    (err) => {
      if (err) throw err;
    }
  );
};

const deleteMessage = async (
  privateKey: string,
  session: string,
  messageTime: string
): Promise<void> => {
  connection.query(
    `DELETE FROM whispr.messages WHERE session = "${session}" AND private_key = "${privateKey}" AND message_time = "${messageTime}"`,
    (err) => {
      if (err) throw err;
    }
  );
};

export { sendMessage, getMessage, editMessage, deleteMessage };
