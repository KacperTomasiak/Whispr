import { connection } from "../database/database";

const authenticateUser = async (privateKey: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM whispr.users WHERE private_key = "${privateKey}"`,
      (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          resolve(true);
        } else {
          connection.query(
            `INSERT INTO whispr.users VALUES ("${privateKey}", "$anonymous", NOW())`,
            (err) => {
              if (err) throw err;
              resolve(true);
            }
          );
        }
      }
    );
  });
};

export { authenticateUser };
