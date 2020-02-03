import { iGetParams, iExecResult } from "../utils";
import { iEntity } from "../entity/Entity";
import App from "../app";
import { DatabaseProvider } from "../database/index";

export abstract class DmlService {
  abstract add(entity: iEntity): iExecResult;
  abstract get(getParams: iGetParams): iEntity[];
  abstract update(entity: iEntity, id: string): iExecResult;
  abstract delete(id: string): void;
  protected key_id: string;
  protected keyEntity: iEntity;
  protected is_key_id: boolean = false;
  public entities: iEntity = <iEntity>{};
  public db: DatabaseProvider;

  public init(getParams?: iGetParams) {
    if (getParams.id) {
      this.key_id = getParams.id;
      this.keyEntity = this.entities[this.key_id];
      this.is_key_id = true;
    }
  }

  constructor(main: App) {
    this.db =  main.db;    
  }
}
