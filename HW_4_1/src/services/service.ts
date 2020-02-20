import { iGetParams, iExecResult } from "../utils";

export abstract class Service {
  public abstract async get(getParams: iGetParams): Promise<iExecResult>;
  public abstract merge(getParams: iGetParams): iExecResult;
  public abstract async delete(id: string):Promise<iExecResult>;
}
