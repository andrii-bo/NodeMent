import App from "../src/app";
import express, { response } from "express";
import chai from "chai";
import chaiHttp from "chai-http";
import { print_info } from "./utils";


function add_user_http(server: express.Application, user: any): any {

  console.log("1:add_rndm_user_http");
  let chr = chai.request(server);
  return chr
    .post('/user')
    .send(user)
    .then(value => {
      print_info("RESPONSE post /user", value.body)
      return value.body.id;
    }
    )
    .catch(err => print_info("ERROR post /user", err.message))

};

function del_user_http(server: express.Application, id: string) {

  console.log("3:del_user_http");
  let chr = chai.request(server);
  return chr
    .delete("/user/" + id)
    .send("succesfully " + id)
    .then(value => print_info("delete /user/" + id, value.body))
    .catch(err => print_info("delete /user/" + id, err.message))
};

async function get_users_with_params_http(server: express.Application) {
  console.log("2:get_users_with_params_http");
  let chr = chai.request(server);
  return await chr
    .get('/user')
    .query("filter=user3@mail.com&limit=1")
    .send("succesfully")
    .then(value => print_info("RESPONSE users with filters/", value.body))
    .catch(err => print_info("ERROR users with filters", err.message));

};

async function run_steps() {
  console.log("-1:");
  chai.use(chaiHttp);
  let myApp: App = new App(3000, 'postgree_main');
  let server: express.Application = myApp.expApp;

  console.log("0:");
  await myApp.serverStart()

  let rnd = Math.floor(Math.random() * 10);
  let user = {
    login: "user" + rnd + "@mail.com",
    password: "12345" + rnd,
    age: 25
  };

  let delete_id: string;
  await add_user_http(server, user).then((value) => {
    print_info("delete id= ", value);
    delete_id = value;
  });

  /*
    user = {
      login: "user3@mail.com",
      password: "12345" + rnd,
      age: 25
    };
    await add_user_http(server, user);
  */
  await get_users_with_params_http(server);
  await del_user_http(server, delete_id);
  console.log("END:");
};

(async function () {
  await run_steps()
})()