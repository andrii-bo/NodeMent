import App from "../src/app";
import express from "express";
import chai from "chai";
import chaiHttp from "chai-http";
import { print_info } from "./utils";


function add_rndm_user_http(server: express.Application) {
  let rnd = Math.floor(Math.random() * 10);
  let user = {
    login: "user" + rnd + "@mail.com",
    password: "12345" + rnd,
    age: 25
  };

  console.log("1:add_rndm_user_http");
  let chr = chai.request(server);
  return chr
    .post('/user')
    .send(user)
    .then((value) => print_info("RESPONSE post /user", value.body))
    .catch((err) => print_info("ERROR post /user", err.message))
};

async function get_all_users_http(server: express.Application) {
  console.log("2:get_all_users_http");
  let chr = chai.request(server);
  try {
    const value = await chr
      .get('/user')
      .query("filter=user3@mail.com&limit=1");
    print_info("RESPONSE get all users with filters", value.body);
    return value;
  }
  catch (err) {
    print_info("ERROR get all users", err.message);
    return err;
  }
};

async function run_steps() {
  console.log("-1:");
  chai.use(chaiHttp);
  let myApp: App = new App(3000, 'postgree_main');
  let server: express.Application = myApp.expApp;

  console.log("0:");
  await myApp.serverStart()
  await add_rndm_user_http(server);
  await get_all_users_http(server);
  console.log("END:");
};

(async function () {
  await run_steps()
})()