import { Column, Entity, BaseEntity } from "typeorm";
import { TDimension } from "./Dimension";

@Entity("hw_group")
export class TGroup extends BaseEntity {
  @Column((type: any) => TDimension)
  common: TDimension;

  @Column()
  public permissions: string;

}
