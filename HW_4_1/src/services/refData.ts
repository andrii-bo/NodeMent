import { iGetParams, iExecResult } from "../utils";
import { TUser } from "../entity/User";
import { Repository } from "typeorm";
import { TDimension } from "../entity/Dimension";
import { Service } from "./service";

export class RefData<T extends TDimension> extends Service<T> {
  public inMemory: boolean;
  public dbRepository: Repository<T>;
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
      let q = this.dbRepository
        .createQueryBuilder("u")
        .select(" * ")
        .orderBy("name");
      if (isFilter) q = q.andWhere(" name like '%' || :name || '%'  ");
      if (isLimit) q = q.limit(getParams.limit);
      q.setParameters({ name: getParams.filter });
      //      let str = q.getQueryAndParameters;
      //      print_info("QUERY", str);
      res = await q.getRawMany();
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

  public delete(id: string) {
    if (!this.inMemory) {
      this.dbRepository
        .createQueryBuilder()
        .update(typeof(this.entity))
        .set({ is_deleted: false })
        .where("id = :id", { id: id })
        .execute();
    }
  }

  constructor(entity: T) {
    super();
    this.entity = entity;
  }
}
