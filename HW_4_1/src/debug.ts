import App from "../src/app";
import chai from "chai";
import chaiHttp from "chai-http";
import { print_info } from "./utils";


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


  let chr = chai.request(server);

  
  chr
    .post('/user')
    .send(user)
    .end((err, res) => {
      print_info("RESPONSE post /user", res.body);
    });


chr
.get('/user')
.query("filter=user3@mail.com&limit=1")
.end((err, res) => {
  print_info("RESPONSE get /user", res.body);
});

  /*
    chr
      .post('/user')
      .send(user)
      .end((err, res) => {
        print_info("RESPONSE post /user", res.body);
      }).then(() => {
        print_info("RESPONSE post /user END");
      });
  
        chr
      .post('/user')
      .send(user)
      .end((err, res) => {
        print_info("RESPONSE post /user", res.body);
      });
  
  */
  /*
    chr
      .get('/user')
      .end((err, res) => {
        print_info("RESPONSE get /user", res.body);
      });
  */
});

