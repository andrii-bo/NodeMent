import { iGetParams, iExecResult } from "../utils";
import App from "../app";
import { DatabaseProvider } from "../database/index";

export abstract class DmlService<T> {
  abstract add(entity: T): iExecResult;
  abstract get(getParams: iGetParams): any;
  abstract update(entity: T, id: string): iExecResult;
  abstract delete(id: string): void;
  protected key_id: string;
  protected keyEntity: T;
  protected is_key_id: boolean = false;
  public srvdb: DatabaseProvider;
  constructor(main: App) {
    this.srvdb = main.db;
  };
  abstract init(getParams?: iGetParams):void ;

}
