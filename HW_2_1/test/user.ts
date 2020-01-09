import myClassApp from "../src/classApp";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

let should = chai.should();
let myApp = new myClassApp();
let server = myApp.expApp;

myApp.serverStart(3000);

describe('Users', () => {

  describe('/GET user', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/user')
            .end((err, res) => {
                res.should.have.status(200);
//                res.body.should.be.a('array');
              done();
            });
      });
  });

/*
 id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
*/

  describe('/POST user', () => {
    it('it should POST a user', (done) => {
      let user = {
          login: "1@mail.com",
          password: "12345",          
          age: 25
      }
      chai.request(server)
          .post('/user')
          .send(user)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              //res.body.user.should.have.property('login');
              //res.body.user.should.have.property('password');
              //res.body.user.should.have.property('age');
            done();
          });
    });

});

});
