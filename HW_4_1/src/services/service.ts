import { iGetParams, iExecResult } from "../utils";

export abstract class Service<T> {
  public abstract async get(getParams: iGetParams): Promise<T[]>;
  public abstract merge(getParams: iGetParams): iExecResult;
  public abstract async delete(id: string);
}
