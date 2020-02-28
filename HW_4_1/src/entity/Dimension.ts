import { Column, PrimaryColumn } from "typeorm";
import { TEntity } from "./Entity";
import { iKeys } from "../utils";

export class TDimension extends TEntity {
  public keys: iKeys = ["id"];
  public GetAttrs(): any {
    return { id: this.id, name: this.name };
  }

  @PrimaryColumn()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public is_deleted: number;

  protected serialize(attrs: any): void {
    this.id = attrs.id;
    this.is_deleted = attrs.is_deleted;
    this.name = attrs.name;
    this.description = attrs.description;
  }
}
