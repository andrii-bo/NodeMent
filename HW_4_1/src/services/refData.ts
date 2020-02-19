import { iGetParams, iExecResult, print_info } from "../utils";
import { TDimension } from "../entity/Dimension";
import { Service } from "./service";
import { TUser } from "../entity/User";
import { Connection, Repository } from "typeorm";

export class RefData<T extends TDimension> extends Service<T> {
  public inMemory: boolean;
  public dbRepository: Repository<TUser>;
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
      const q = this.dbRepository
        .createQueryBuilder()
        .update(TUser, { is_deleted: true })
        .where("id = :id", { id: id });

      const str = q.getQueryAndParameters();
      q.execute();
      print_info("QUERY delete", str);

      //this.connection.query("update hw_user set is_deleted=true where id= $1 ", [id]);

    }
  }

  constructor(entity: T) {
    super();
    this.entity = entity;
  }
}
