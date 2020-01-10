export enum lstCRUD {
  Create = "CREATE",
  Read = "READ",
  Update = "UPDATE",
  Delete = "DELETE",
}

interface iError {
  code: string;
  message: string;
  stack: string;
  request: string;
}

export function handleError(
  pErr: any,
  pCode?: string,
  pReq?: string
): iError {
  let lError: iError = <iError>{};
  lError.code = pCode;
  lError.message = pErr.message;
  lError.stack = pErr.stack;
  lError.request = pReq;
  return lError;
}
