import express from "express";
import { Controller } from "./controller";
import { IUser } from "models/userMdl";
import { DmlService } from "services/dmlService";

export class UserController extends Controller {
  constructor(expApp: express.Application, srv: DmlService) {
    super(expApp, srv);
    this.mapRoutesToEntity<IUser>("user");
  }
}
