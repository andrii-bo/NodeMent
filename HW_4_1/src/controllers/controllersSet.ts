import { RefData } from "../services/refData";
import App from "../app";
import { TUser } from "../entity/User";
import { Controller } from "./controller";
import { Connection,Repository } from "typeorm";

export class ControllersSet {
  protected controllers: any[] = [];

  constructor(main: App) {
    let srv = new RefData<TUser>(new TUser());
    this.controllers.push(new Controller<TUser>(main.expApp, "user", srv));
  }

  public setRepo(connection: Connection) {
    for (var controller of this.controllers) {
      controller.srv.connection = connection;
      controller.srv.dbRepository = connection.getRepository(TUser);
    }
  }
}
