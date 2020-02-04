import { UserController } from "./userCtl";
import { UserSrv } from "../services/UserSrv";
import App from "../app";

export class ControllersSet {
  protected main: App;
  protected controllers: any[] = [];

  constructor(main:App) {
    this.main = main;
    this.controllers.push(new UserController(main, new UserSrv()));
  }
}
