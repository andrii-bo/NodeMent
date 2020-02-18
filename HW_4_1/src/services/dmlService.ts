import { iGetParams, iExecResult, print_info } from "../utils";
import App from "../app";
import { DatabaseProvider } from "../database/index";
import { TUser } from "../entity/User";
import { TDimension } from "../entity/Dimension";
import { Repository } from "typeorm";


export abstract class DmlService<T> {
  protected dbRepository: Repository<TUser>;

  public async get(getParams: iGetParams): Promise<T[]> {
    let res: T[] = [];
    let isLimit: boolean = false;
    let isFilter: boolean = false;

    if (getParams.limit) isLimit = true;
    else isLimit = false;
    if (getParams.filter) isFilter = true;
    else isFilter = false;

    if (this.srvdb.connectionStatus.code === 200) {
      let q = this.srvdb.connection
        .getRepository(TUser)
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
    let entity: TUser = new TUser;
    let res: iExecResult = entity.assign(getParams.entity);
    if (res.code === 200) {
      if (this.srvdb.connectionStatus.code === 200) {
        this.srvdb.connection.getRepository(TUser).save(entity);
      }
    };
    return res;
  }

  public delete(id: string) {
    if (this.srvdb.connectionStatus.code === 200) {
      this.srvdb.connection
        .getRepository(TUser)
        .createQueryBuilder()
        .update(TUser)
        .set({ is_deleted: false })
        .where("id = :id", { id: id })
        .execute();
    }
  }

  public srvdb: DatabaseProvider;
  constructor(main: App) {
    this.srvdb = main.db;
    //this.dbRepository = this.srvdb.connection.getRepository(TUser);
  };

}
