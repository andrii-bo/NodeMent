import express from "express";
import { Controller } from "./controller";
import { IUser } from "models/userMdl";
import { DmlService } from "services/dmlService";
import App from "../app";

export class UserController extends Controller {
  constructor(main: App, srv: DmlService) {
    super(main, srv);
    this.mapRoutesToEntity<IUser>("user");
  }
}
