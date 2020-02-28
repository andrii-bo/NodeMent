import { iGetParams, iExecResult, retResult, retError } from "../utils";
import { Connection, Repository } from "typeorm";
import { TEntity } from "../entity/Entity";

export abstract class Service {
  public connection: Connection;
  public dbRepository: Repository<TEntity>;
  public classRefData: typeof TEntity;
  public inMemory: boolean;
  protected entity: TEntity;
  public abstract async get(getParams: iGetParams): Promise<iExecResult>;
  
  public async merge(getParams: iGetParams): Promise<iExecResult> {
    let res: iExecResult = this.entity.assign(getParams.entity);
    if (res.code === 200) {
      if (!this.inMemory) {
        await this.dbRepository
          .save(this.entity)
          .then(value => (res = retResult(value.GetAttrs())))
          .catch(reason => (res = retError(400, reason)));
      }
    }
    return res;
  }

  public abstract async delete(id: string): Promise<iExecResult>;
  public setConnection(connection: Connection) {
    this.connection = connection;
    this.dbRepository = connection.getRepository(this.classRefData);
  }
}
