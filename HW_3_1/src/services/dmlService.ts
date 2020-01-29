import { iGetParams } from "../utils";
import { iEntity } from "../models/entityMdl";
import { Connection } from "typeorm";
import { DatabaseProvider } from "../database/index";

export abstract class DmlService {
  abstract add(entity: iEntity): iEntity;
  abstract get(entity: iEntity, getParams: iGetParams): iEntity[];
  abstract update(entity: iEntity, id: string): iEntity;
  abstract delete(id: string): void;
  protected key_id: string;
  protected keyEntity: iEntity;
  protected is_key_id: boolean = false;
  public entities: iEntity = <iEntity>{};
  private db: DatabaseProvider;
  protected connection: Connection;
  
  public init(getParams?: iGetParams) {
    if (getParams.id) {
      this.key_id = getParams.id;
      this.keyEntity = this.entities[this.key_id];
      this.is_key_id = true;
    }
  }

  constructor(db: DatabaseProvider) {
    this.db = db;
  }
}
