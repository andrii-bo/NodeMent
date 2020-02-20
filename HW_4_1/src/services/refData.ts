import {
  iGetParams,
  iExecResult,
  print_info,
  retResult,
  retError
} from "../utils";
import { TDimension } from "../entity/Dimension";
import { Service } from "./service";
import { Connection, Repository } from "typeorm";

export class RefData extends Service {
  public inMemory: boolean;
  public dbRepository: Repository<TDimension>;
  public connection: Connection;
  private entity: any;

  public async get(getParams: iGetParams): Promise<iExecResult> {
    let res: any[];
    let isLimit: boolean = false;
    let isFilter: boolean = false;
    if (getParams.limit) isLimit = true;
    else isLimit = false;
    if (getParams.filter) isFilter = true;
    else isFilter = false;
    console.log(10);
    if (!this.inMemory) {
      let q = this.dbRepository
        .createQueryBuilder("u")
        .select(" * ")
        .orderBy("name");
      if (isFilter) q = q.andWhere(" name like '%' || :name || '%'  ");
      if (isLimit) q = q.limit(getParams.limit);
      q.setParameters({ name: getParams.filter });
      let str = q.getQueryAndParameters();
      print_info("QUERY", str);
      console.log(11);      
      res = await q.getRawMany();
      console.log(12);          
    }
    return retResult(res);
  }

  public merge(getParams: iGetParams): iExecResult {
    let res: iExecResult = this.entity.assign(getParams.entity);
    if (res.code === 200) {
      if (!this.inMemory) {
        this.dbRepository.save(this.entity);
      }
    }
    return res;
  }

  public async delete(id: string): Promise<iExecResult> {
    let res: iExecResult = retResult({ id: id });
    if (!this.inMemory) {
      await this.dbRepository
        .createQueryBuilder()
        .update()
        .set({ is_deleted: 1 })
        .where("id = :id", { id: id })
        .execute()
        .then(value => (res = retResult(value)))
        .catch(value => (res = retError(400, value)));
    }
    return res;
  }

  constructor(entity: any) {
    super();
    this.entity = entity;
  }
}
