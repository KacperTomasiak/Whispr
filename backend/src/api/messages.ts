import { connection } from "./database";
import { encrypt, decrypt } from "./encryption";

const sendMessage = (
  privateKey: string,
  session: string,
  message: string
): void => {
  const ciphertext: string = encrypt(session, message);
  connection.query(
    `INSERT INTO whispr.messages VALUES ("${session}", "${privateKey}", "${ciphertext}", NOW())`,
    (err) => {
      if (err) throw err;
    }
  );
};

const getMessage = async (session: string): Promise<JSON> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT session, messages.private_key AS privateKey, username, message, message_time AS messageTime FROM whispr.messages INNER JOIN whispr.users ON users.private_key = messages.private_key WHERE session = "${session}" ORDER BY message_time DESC`,
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

export { sendMessage, getMessage };
