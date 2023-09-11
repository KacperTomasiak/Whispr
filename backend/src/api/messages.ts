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

export { sendMessage };
