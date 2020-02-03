import App from "../src/app";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

let myApp = new App(3000, 'postgree_main');
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
