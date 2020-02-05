import { iGetParams, iExecResult } from "../utils";
import App from "../app";
import { DatabaseProvider } from "../database/index";

export abstract class DmlService<T> {
  public abstract get(getParams: iGetParams): any;
  public abstract merge(getParams: iGetParams): iExecResult;
  public abstract delete(id: string): void;
  protected key_id: string;
  public srvdb: DatabaseProvider;
  constructor(main: App) {
    this.srvdb = main.db;
  };
  
}
