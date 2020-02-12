import { Column, Entity, PrimaryColumn, BaseEntity } from "typeorm";

@Entity("hw_user_group")
export class TUserGroup extends BaseEntity {
  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  group_id: string;
  
}

