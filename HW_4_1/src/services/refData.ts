import { iGetParams, iExecResult, print_info } from "../utils";
import { TDimension } from "../entity/Dimension";
import { Service } from "./service";
import { Connection, Repository } from "typeorm";

export class RefData<T extends TDimension> extends Service<T> {
  public inMemory: boolean;
  public dbRepository: Repository<TDimension>;
  public connection: Connection;
  private entity: any;

  public async get(getParams: iGetParams): Promise<T[]> {
    let res: T[] = [];
    let isLimit: boolean = false;
    let isFilter: boolean = false;
    if (getParams.limit) isLimit = true;
    else isLimit = false;
    if (getParams.filter) isFilter = true;
    else isFilter = false;

    if (!this.inMemory) {
      console.log(6);
      let q = this.dbRepository
        .createQueryBuilder("u")
        .select(" * ")
        .orderBy("name");
      if (isFilter) q = q.andWhere(" name like '%' || :name || '%'  ");
      if (isLimit) q = q.limit(getParams.limit);
      q.setParameters({ name: getParams.filter });
      let str = q.getQueryAndParameters();
      print_info("QUERY", str);
      console.log(7);
      res = await q.getRawMany();
      console.log(8);
    }
    return res;
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

  public async delete(id: string) {
    if (!this.inMemory) {
      return new Promise(resolve =>  resolve());
      return this.dbRepository
        .createQueryBuilder()
        .update()
        .set({ is_deleted: 1 })
        .where("id = :id", { "id": id })
        .execute();
        /*
        .then((value) => (print_info("result delete", value)))
        .catch((value) => (print_info("error delete", value)))
        */
    }
  }

  constructor(entity: T) {
    super();
    this.entity = entity;
  }
}

