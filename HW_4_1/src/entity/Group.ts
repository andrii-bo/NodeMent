import { Column, Entity } from "typeorm";
import { TDimension } from "./Dimension";

@Entity("hw_group")
export class TGroup extends TDimension {

  @Column()
  public permissions: string;

  protected serialize(attrs: any): void {
    super.serialize(attrs);
    this.permissions = attrs.permissions;
  };


}
