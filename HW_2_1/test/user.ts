import myClassApp from "../src/classApp";
import chai from "chai";
var expect = require("chai").expect;
import chaiHttp from "chai-http";

chai.use(chaiHttp);

let should = chai.should();
let myApp = new myClassApp();
let server = myApp.expApp;

myApp.serverStart(3000);

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
