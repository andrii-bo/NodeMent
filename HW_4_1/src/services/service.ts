import { iGetParams, iExecResult } from "../utils";
import { Connection, Repository } from "typeorm";
import { TEntity } from "../entity/Entity";

export abstract class Service {
  public connection: Connection;
  public dbRepository: Repository<TEntity>;
  public classRefData: typeof TEntity;
  public inMemory: boolean;
  protected entity: TEntity;
  public abstract async get(getParams: iGetParams): Promise<iExecResult>;
  public abstract async merge(getParams: iGetParams): Promise<iExecResult>;
  public abstract async delete(id: string): Promise<iExecResult>;
  public setConnection(connection: Connection) {
    this.connection = connection;
    this.dbRepository = connection.getRepository(this.classRefData);
  };
}
