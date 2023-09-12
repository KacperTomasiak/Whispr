import { connection } from "./database";

const sendMessage = (
  privateKey: string,
  session: string,
  message: string
): void => {
  connection.query(
    `INSERT INTO whispr.messages VALUES ("${session}", "${privateKey}", "${message}", NOW())`,
    (err) => {
      if (err) throw err;
    }
  );
};

const getMessage = async (session: string): Promise<JSON> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT session, messages.private_key AS privateKey, username, message, message_time AS messageTime FROM whispr.messages INNER JOIN whispr.users ON users.private_key = messages.private_key WHERE session = "${session}" ORDER BY message_time`,
      (err, result) => {
        if (err) throw err;
        resolve(JSON.parse(JSON.stringify(result)));
      }
    );
  });
};

export { sendMessage, getMessage };
