import * as mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

connection.connect((err) => {
  if (err) throw err;
});

const createDatabase = (): void => {
  connection.query("CREATE DATABASE IF NOT EXISTS whispr", (err) => {
    if (err) throw err;
  });
};

const createTables = (): void => {
  connection.query(
    "CREATE TABLE IF NOT EXISTS whispr.users (private_key VARCHAR(36), username TEXT, registration_date DATE)",
    (err) => {
      if (err) throw err;
    }
  );
  connection.query(
    "CREATE TABLE IF NOT EXISTS whispr.sessions (session VARCHAR(34), private_key VARCHAR(36))",
    (err) => {
      if (err) throw err;
    }
  );
  connection.query(
    "CREATE TABLE IF NOT EXISTS whispr.messages (id BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY, session VARCHAR(34), " +
      "private_key VARCHAR(36), message TEXT, reference BIGINT(20), message_time DATETIME, edited BOOLEAN, attachments TEXT)",
    (err) => {
      if (err) throw err;
    }
  );
};

export { connection, createDatabase, createTables };
