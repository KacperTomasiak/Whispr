import { connection } from "../database/database";
import { encrypt, decrypt } from "../services/encryption";

const sendMessage = (
  privateKey: string,
  session: string,
  message: string,
  reference: number
): void => {
  const ciphertext: string = encrypt(session, message);
  connection.query(
    `INSERT INTO whispr.messages (session, private_key, message, reference, message_time, edited) VALUES ` +
      `("${session}", "${privateKey}", "${ciphertext}", "${reference}", UTC_TIMESTAMP(), FALSE)`,
    (err) => {
      if (err) throw err;
    }
  );
};

const getMessage = async (session: string): Promise<JSON> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id, session, messages.private_key AS privateKey, username, message, reference, ` +
        `CONVERT_TZ(message_time, "+00:00", @@session.time_zone) AS messageTime, edited FROM ` +
        `whispr.messages INNER JOIN whispr.users ON users.private_key = messages.private_key WHERE ` +
        `session = "${session}" ORDER BY id DESC`,
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

const editMessage = (id: number, session: string, message: string): void => {
  connection.query(
    `UPDATE whispr.messages SET message = "${encrypt(
      session,
      message
    )}", message_time = UTC_TIMESTAMP(), edited = TRUE WHERE id = "${id}"`,
    (err) => {
      if (err) throw err;
    }
  );
};

const deleteMessage = (id: number): void => {
  connection.query(`DELETE FROM whispr.messages WHERE id = "${id}"`, (err) => {
    if (err) throw err;
  });
};

export { sendMessage, getMessage, editMessage, deleteMessage };
