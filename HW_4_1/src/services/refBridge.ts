import { iGetParams, iExecResult, retResult, retError } from "../utils";
import { TDimension } from "../entity/Dimension";
import { Service } from "./service";

export class RefData extends Service {

  constructor(classRefData: typeof TDimension) {
    super();
    this.classRefData = classRefData;
    this.entity = new classRefData();
  }
}
