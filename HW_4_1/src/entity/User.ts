import Joi from "@hapi/joi";
import { Column, Entity } from "typeorm";
import { TDimension } from "./Dimension";
import { iExecResult, print_info, retError, retResult } from "../utils";

const userSchema: Joi.ObjectSchema = Joi.object({
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
export class TUser extends TDimension {

  @Column()
  public password: string;

  @Column()
  public age: number;

  public assign(reqAttrs: any): iExecResult {
    reqAttrs.name = reqAttrs.login;
    validated_res = 
    super.assign(reqAttrs);

  }
}

