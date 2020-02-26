import { Entity, PrimaryColumn } from "typeorm";
import { TEntity } from "./Entity";

@Entity("hw_user_group")
export class TUserGroup extends TEntity {

  public GetAttrs(): any {
    return { user_id: this.user_id, group_id: this.group_id };
  }

  protected serialize(attrs: any): void {
    this.user_id = attrs.user_id;
    this.group_id = attrs.group_id;
  }

  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  group_id: string;

}

