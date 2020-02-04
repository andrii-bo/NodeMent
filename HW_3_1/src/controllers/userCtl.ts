import { Controller } from "./controller";
import { TUser } from "entity/User";
import { DmlService } from "services/dmlService";
import App from "../app";

export class UserController extends Controller<TUser> {
  constructor(main: App, srv: DmlService<TUser>) {
    super(main, srv);
    this.mapRoutesToEntity("user");
  }


}
