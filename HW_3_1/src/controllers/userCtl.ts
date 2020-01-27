import express from "express";
import { Controller } from "./controller";
import { UserSrv } from "../services/userSrv";
import { DatabaseProvider } from "database";

export class UserController extends Controller {
  constructor(expApp: express.Application, db: DatabaseProvider) {
    super(expApp, db, new UserSrv());
    this.mapRoutesToEntity("user");
  }
}
