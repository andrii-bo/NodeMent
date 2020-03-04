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
        .orderBy((params.filters.order);
      if (isFilter) q = q.andWhere(params.filters);
      if (isLimit) q = q.limit(params.filters.limit);
      q.setParameters(params.filters);
      let str = q.getQueryAndParameters();
      print_info("QUERY", str);
      res = await q.getRawMany();
    }
    return retResult(res);
  }

  constructor(classRefData: typeof TDimension) {
    super();
    this.classRefData = classRefData;
    this.entity = new classRefData();
  }
}
