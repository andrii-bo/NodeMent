export enum lstCRUD {
  Create = "CREATE",
  Read = "READ",
  Update = "UPDATE",
  Delete = "DELETE",
  Clear = "CLEAR"
}

export interface iExecResult {
  code?: number;
  message?: string;
  stack?: string;
  request?: string;
  result?: any;
}

export function retResult(
  result?: any,
  code: number = 200,
  req?: string,
  message?: string
): iExecResult {
  let lResult: iExecResult = <iExecResult>{};
  lResult.code = code;
  lResult.message = message;
  lResult.request = req;
  lResult.result = result;
  return lResult;
}

export function print_info(
  title: string,
  message?: any,
  is_end: boolean = false
): void {
  if (is_end) {
    console.log(message);
    console.log("----------" + title + "--/\\---");
  } else {
    console.log("----------" + title + "--\\/---");
    console.log(message);
  };
}

export function retError(
  pCode: number,
  pErr?: any,
  pReq?: string
): iExecResult {
  let lError: iExecResult = <iExecResult>{};
  lError.code = pCode;
  lError.message = pErr.message;
  lError.stack = pErr.stack;
  lError.request = pReq;
  lError.result = pErr;
  return lError;
}

export interface iGetParams {
  filters?: any;
  entity?: any;
  crudOp?: lstCRUD;
}

export interface iKey {
  name: string;
  dbName: string;
  value?: any;
}

export interface iKeys {
  [index: number]: string;
}
