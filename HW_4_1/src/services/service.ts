import {
  iGetParams,
  iExecResult,
  retResult,
  retError,
  print_info
} from "../utils";
import { Connection, Repository } from "typeorm";
import { TEntity } from "../entity/Entity";

export abstract class Service {
  public connection: Connection;
  public dbRepository: Repository<TEntity>;
  public classRefData: typeof TEntity;
  public inMemory: boolean;
  protected entity: TEntity;

  public async merge(params: iGetParams): Promise<iExecResult> {
    let res: iExecResult = this.entity.assign(params.entity);
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

  public async get(params: iGetParams): Promise<iExecResult> {
    let res: any[];
    let isLimit: boolean = false;
    let isFilter: boolean = false;
    if (params.filters.limit) isLimit = true;
    else isLimit = false;
    if (params.filters) isFilter = true;
    else isFilter = false;
    if (!this.inMemory) {
      let q = this.dbRepository
        .createQueryBuilder("u")
        .select(" * ")
        .orderBy(params.filters.order);
      if (isFilter) q = q.andWhere(params.filters);
      if (isLimit) q = q.limit(params.filters.limit);
      q.setParameters(params.filters);
      let str = q.getQueryAndParameters();
      print_info("QUERY", str);
      res = await q.getRawMany();
    }
    return retResult(res);
  }

  public async clear(): Promise<iExecResult> {
    let res: iExecResult;
    await this.dbRepository
      .createQueryBuilder()
      .delete()
      .execute()
      .then(() => {
        console.log("CLEAR_then succusefull");
        res = retResult();
      })
      .catch(reason => {
        console.log("CLEAR_then unsuccusefull", reason);
        res = retError(400, reason);
      });
    return res;
  }

  public async purge(params: iGetParams): Promise<iExecResult> {
    let res: iExecResult;
    await this.dbRepository
      .delete(params.filters)
      .then(value => (res = retResult(value)))
      .catch(reason => (res = retError(400, reason)));
    return retResult(res);
  }

  public async delete(params: iGetParams): Promise<iExecResult> {
    let res: iExecResult;
    await this.dbRepository
      .update(params.filters, { is_deleted: 1 })
      .then(value => (res = retResult(value)))
      .catch(reason => (res = retError(400, reason)));
    return retResult(res);
  }

  public setConnection(connection: Connection) {
    this.connection = connection;
    this.dbRepository = connection.getRepository(this.classRefData);
  }
}
