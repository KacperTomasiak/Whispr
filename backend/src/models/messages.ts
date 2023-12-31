import { connection } from "../database/database";
import { encrypt, decrypt } from "../services/encryption";
import { createMessageFolder, deleteMessageFolder } from "../services/media";

const getLatestId = async (privateKey: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id FROM whispr.messages WHERE private_key = "${privateKey}" ORDER BY id DESC LIMIT 1`,
      (err, data) => {
        if (err) throw err;
        let id: number = 1;
        if (data.length > 0) {
          id = data[0].id;
        }
        resolve(id);
      }
    );
  });
};

const getPrivateKey = async (id: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT private_key FROM whispr.messages WHERE id = "${id}"`,
      (err, data) => {
        if (err) throw err;
        resolve(data[0].private_key);
      }
    );
  });
};

const sendMessage = async (
  privateKey: string,
  session: string,
  message: string,
  reference: number,
  attachments: string[]
): Promise<void> => {
  const ciphertext: string = encrypt(session, message);
  connection.query(
    `INSERT INTO whispr.messages (session, private_key, message, reference, message_time, edited, attachments) VALUES ` +
      `("${session}", "${privateKey}", "${ciphertext}", "${reference}", UTC_TIMESTAMP(), FALSE, "${attachments}")`,
    (err) => {
      if (err) throw err;
    }
  );
  if (attachments.length > 0) {
    let id: number = await getLatestId(privateKey);
    createMessageFolder(privateKey, id);
  }
};

const getMessage = async (session: string): Promise<JSON> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id, session, messages.private_key AS privateKey, username, message, reference, ` +
        `CONVERT_TZ(message_time, "+00:00", @@session.time_zone) AS messageTime, edited, attachments FROM ` +
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

const deleteMessage = (privateKey: string, id: number): void => {
  connection.query(`DELETE FROM whispr.messages WHERE id = "${id}"`, (err) => {
    if (err) throw err;
    deleteMessageFolder(privateKey, id);
  });
};

export {
  getLatestId,
  getPrivateKey,
  sendMessage,
  getMessage,
  editMessage,
  deleteMessage,
};
