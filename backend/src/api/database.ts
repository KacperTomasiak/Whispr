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

const createTable = (): void => {
  connection.query(
    "CREATE TABLE IF NOT EXISTS whispr.users (private_key varchar(36), username text, registration_date date)",
    (err) => {
      if (err) throw err;
    }
  );
};

export { connection, createDatabase, createTable };
