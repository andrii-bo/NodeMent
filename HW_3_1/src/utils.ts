export enum lstCRUD {
  Create = "CREATE",
  Read = "READ",
  Update = "UPDATE",
  Delete = "DELETE",
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
  message?:string
): iExecResult {
  let lResult: iExecResult = <iExecResult>{};
  lResult.code = code;
  lResult.message = message;  
  lResult.request = req;
  lResult.result = result;
  return lResult;
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
  return lError;
}

export interface iGetParams {
  id?:string;
  limit?: number;
  filter?: string;
}
