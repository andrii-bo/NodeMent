import { UserSrv } from "../services/UserSrv";
import App from "../app";
import { TUser } from "../entity/User";
import { Controller } from "./controller";

export class ControllersSet {
  protected controllers: any[] = [];

  constructor(main: App) {
    this.controllers.push(new Controller<TUser>(main.expApp, new UserSrv(main), "user"));
  }
}
