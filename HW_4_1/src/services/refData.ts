import {
  iGetParams,
  iExecResult,
  print_info,
  retResult,
  retError
} from "../utils";
import { TDimension } from "../entity/Dimension";
import { Service } from "./service";

export class RefData extends Service {
  public async get(getParams: iGetParams): Promise<iExecResult> {
    let res: any[];
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
      let str = q.getQueryAndParameters();
      print_info("QUERY", str);
      res = await q.getRawMany();
    }
    return retResult(res);
  }

  public async delete(id: string[]): Promise<iExecResult> {
    let res: iExecResult;
    await this.dbRepository
      .update(id[1], { is_deleted: 1 })
      .then(value => (res = retResult(value)))
      .catch(reason => (res = retError(400, reason)));
    return retResult(res);
  }

  constructor(classRefData: typeof TDimension) {
    super();
    this.classRefData = classRefData;
    this.entity = new classRefData();
  }
}
