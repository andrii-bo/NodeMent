import App from "./app";
import { DatabaseCredentials } from "./database/"

let myApp = new App();
let databaseCredentials: DatabaseCredentials = {
    type: 'postgres',
    database: 'zicztuyh',
    username: 'zicztuyh',
    password: '1O7JGw1E2NFAoUjbeAQcValRGTiQv6by',
    host: 'balarama.db.elephantsql.com',
    port: 5432
};

myApp.serverStart(3000, databaseCredentials);
