export enum lstCRUD {
  Create = "CREATE",
  Read = "READ",
  Update = "UPDATE",
  Delete = "DELETE",
}

export interface iExecResult {
  code: number;
  message?: string;
  stack?: string;
  request?: string;
}

export function retResult(
  code: number,
  req?: string,
  message?:string
): iExecResult {
  let lResult: iExecResult = <iExecResult>{};
  lResult.code = code;
  lResult.message = message;  
  lResult.request = req;
  return lResult;
}

export function retError(
  pErr: any,
  pCode: number,
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
