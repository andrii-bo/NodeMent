import App from "../src/app";
import chai from "chai";
var expect = require("chai").expect;
import chaiHttp from "chai-http";
import { DatabaseCredentials } from "../src/database/index";

chai.use(chaiHttp);

let should = chai.should();
let myApp = new App();
let server = myApp.expApp;
let databaseCredentials: DatabaseCredentials = {
  type: 'postgres',
  database: 'zicztuyh',
  username: 'zicztuyh',
  password: '1O7JGw1E2NFAoUjbeAQcValRGTiQv6by',
  host: 'balarama.db.elephantsql.com',
  port: 5432
};

myApp.serverStart(3000,databaseCredentials);

describe('Users CRUD', () => {

  for (let index = 0; index < 5; index++) {

    it('it should POST a user', (done) => {
      let user = {
        "login": "user" + index + "@mail.com",
        "password": "12345" + index,
        "age": 25
      };
      chai.request(server)
        .post('/user')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

  };

  describe('/GET user', () => {
    it('it should GET 5 the users', (done) => {
      chai.request(server)
        .get('/user')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(5);
          done();
        });
    });
  });


});

describe('Users validation', () => {
    it('it shouldnt POST a user with age more then 130, repsonse status 400', (done) => {
      let user = {
        "login": "user7@mail.com",
        "password": "12345g" ,
        "age": 131
      };
      chai.request(server)
        .post('/user')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
});
