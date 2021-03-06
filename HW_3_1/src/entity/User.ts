import  Joi  from "@hapi/joi";
import { Column, Entity, PrimaryColumn, BaseEntity } from "typeorm";

export const userSchema: Joi.ObjectSchema = Joi.object({
  id: Joi.string().required(),
  login: Joi.string()
    .regex(/^\w+/)
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  age: Joi.number()
    .integer()
    .min(4)
    .max(130)
    .required(),
  is_deleted: Joi.bool().required()
});

@Entity("hw_user")
export class TUser extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  public is_deleted: boolean;

  @Column({name: "name"})
  public login: string;

  @Column()
  public password: string;

  @Column()
  public age: number;

  public assign(entity: TUser) {
    this.id = entity.id;
    this.is_deleted = entity.is_deleted;
    this.age = entity.age;
    this.login = entity.login;
    this.password = entity.password;
  }

  static findByLogin(login: string) {
    return this.createQueryBuilder("u")
      .where("u.login like '%:firstName%'", { login })
      .getMany();
  }
}

export interface Users {
  [id: string]: TUser;
}
