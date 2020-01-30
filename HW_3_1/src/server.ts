import App from "./app";
import { DatabaseCredentials } from "./database/";

let databaseCredentials: DatabaseCredentials = {
  type: "postgres",
  database: "zicztuyh",
  username: "zicztuyh",
  password: "1O7JGw1E2NFAoUjbeAQcValRGTiQv6by",
  host: "balarama.db.elephantsql.com",
  port: 5432
};

let myApp = new App(3000, databaseCredentials);
myApp.serverStart();
