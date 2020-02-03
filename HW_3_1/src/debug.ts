import App from "../src/app";
import { DatabaseCredentials } from "../src/database/index";
import chai from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);

let databaseCredentials: DatabaseCredentials = {
  type: "postgres",
  database: "zicztuyh",
  username: "zicztuyh",
  password: "1O7JGw1E2NFAoUjbeAQcValRGTiQv6by",
  host: "balarama.db.elephantsql.com",
  port: 5432
};

let myApp = new App(3000, databaseCredentials);
let server = myApp.expApp;

myApp.serverStart().then(() => {
    if (myApp.db.connectionStatus.code === 200) {
    console.log("  Database connected ");
  }

  let rnd = Math.floor(Math.random() * 10);

  let user = {
    login: "user" + rnd + "@mail.com",
    password: "12345" + rnd,
    age: 25
  };

  chai
    .request(server)
    .post("/user")
    .send(user)
    .end((err, res) => {
      console.log(res.body);
    });

  chai
    .request(server)
    .get("/user")
    .end((err, res) => {
      console.log(res.body);
    });
});
