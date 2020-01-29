import { UserController } from "./userCtl";
import express from "express";
import { DatabaseProvider } from "database";
import { Controller } from "./controller";
import { UserSrv } from "../services/UserSrv";
import App from "../app";

export class ControllersSet {
  protected main: App;
  protected controllers: Controller[] = [];

  constructor(main:App) {
    this.main = main;
    this.controllers.push(new UserController(main, new UserSrv(main)));
  }
}
