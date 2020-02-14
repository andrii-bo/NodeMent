import { Column, Entity, BaseEntity } from "typeorm";
import { TDimension } from "./Dimension";

@Entity("hw_group")
export class TGroup extends TDimension {

  @Column()
  public permissions: string;

}
