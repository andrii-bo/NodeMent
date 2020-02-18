import App from "../src/app";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
let should = chai.should();

let myApp = new App(3000, "postgree_main");
let server = myApp.expApp;
myApp.serverStart();

describe("Connect to DB and add New user", () => {
  it("db.connection.connect should", done => {
    expect(myApp.db.connected).true;
  });

});


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

