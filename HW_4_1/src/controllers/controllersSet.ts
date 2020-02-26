import { RefData } from "../services/refData";
import App from "../app";
import { TUser } from "../entity/User";
import { TGroup } from "../entity/Group";
import { Controller } from "./controller";
import { Connection } from "typeorm";

export class ControllersSet {
  protected controllers: any[] = [];

  constructor(main: App) {
    let srv = new RefData(TUser);
    this.controllers.push(new Controller(main.expApp, "user", srv));

    srv = new RefData(TGroup);
    this.controllers.push(new Controller(main.expApp, "group", srv));

  }

  public setConnection(connection: Connection) {
    for (var controller of this.controllers) {
      controller.srv.setConnection(connection);
    }
  }
}
