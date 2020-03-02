import { TEntity } from "./Entity";
import { iKeys } from "../utils";
import { PrimaryColumn, Column, Entity } from "typeorm";

@Entity("hw_user_group")
export class TTwoKeyBridge extends TEntity {
  @PrimaryColumn()
  public user_id: string;

  @PrimaryColumn()
  public group_id: string;

  public GetAttrs(): any {
    return { user_id: this.user_id, group_id: this.group_id };
  }

  protected serialize(attrs: any): void {
    this.user_id = attrs.user_id;
    this.group_id = attrs.group_id;
  }
}
