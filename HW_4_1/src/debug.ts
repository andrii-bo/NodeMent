import App from "../src/app";
import express, { response } from "express";
import chai from "chai";
import chaiHttp from "chai-http";
import { print_info } from "./utils";


async function add_user_http(server: express.Application, kind: string): Promise<string> {
  console.log("1: add_rndm_user_http", kind);
  let user: any;
  let rnd = Math.floor(Math.random() * 10);
  if (kind === "random") {
    user = {
      login: "user" + rnd + "@mail.com",
      password: "12345" + rnd,
      age: 25
    };
  } else {
    user = {
      login: "user3@mail.com",
      password: "12345678" + rnd,
      description: "test update",
      age: 25
    };
  };

  let chr = chai.request(server);
  return chr
    .post('/user')
    .send(user)
    .then(value => {
      print_info("new user", value.body, true)
      return value.body.id;
    })
    .catch(err => print_info("ERROR new user", err.message))
};

function upd_user_http(server: express.Application, user: any, id: string): any {
  console.log("4:upd_user_http");
  let chr = chai.request(server);
  return chr
    .put('/user/' + id)
    .send(user)
    .then(value => {
      print_info("RESPONSE post /user", value.body)
      return value.body.id;
    })
    .catch(err => print_info("ERROR post /user", err.message))
};

async function del_user_http(server: express.Application, id: string) {
  console.log("3:del_user_http");
  let chr = chai.request(server);
  return chr
    .delete("/user/" + id)
    .then(value => print_info("delete user=" + id, value.body, true))
    .catch(err => print_info("error delete user" + id, err.message))
};

async function clear_user_http(server: express.Application) {
  console.log("0: CLEAR");
  let chr = chai.request(server);
  return chr
    .delete("/user")
    .then(value => print_info("clear users", value.body, true))
    .catch(err => print_info(" error clear users", err.message))
};

async function get_users_with_params_http(server: express.Application) {
  console.log("2:get_users_with_params_http");
  let chr = chai.request(server);
  return await chr
    .get('/user')
    .query("filter=user3@mail.com&limit=1")
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

  await clear_user_http(server);
  let l_id: string = await add_user_http(server, 'random');

  await del_user_http(server, l_id);
  /*  
    await get_users_with_params_http(server);
  
    let user_upd = {
      login: "user3@mail.com",
      password: "12345678" + rnd,
      description: "test update",
      age: 25
    };
    await upd_user_http(server, user_upd, l_id);
  */
  console.log("END:");
};

(async function () {
  await run_steps()
})()