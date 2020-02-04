import { iGetParams, iExecResult } from "../utils";
import App from "../app";
import { DatabaseProvider } from "../database/index";
import { TUser } from "../entity/User";

export abstract class DmlService<T> {
  abstract add(entity: T): iExecResult;
  abstract get(getParams: iGetParams): T[];
  abstract update(entity: T, id: string): iExecResult;
  abstract delete(id: string): void;
  protected key_id: string;
  protected keyEntity: any;
  protected is_key_id: boolean = false;
  public entities: T[];
  public db: DatabaseProvider;
  protected dbRepository ;  

  public init(main: App, getParams?: iGetParams) {
    if (getParams.id) {
      this.key_id = getParams.id;
      this.keyEntity = this.entities[this.key_id];
      this.is_key_id = true;
      this.db =  main.db;    
      this.dbRepository = this.db.connection.getRepository(TUser);          
    }
  }

}
