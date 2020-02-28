import Joi from "@hapi/joi";
import { iExecResult, retResult, print_info, retError, iKeys } from "../utils";
import uuid = require("uuid");

export abstract class TEntity {
  public abstract keys: iKeys;
  public is_deleted: number;
  protected schema: Joi.ObjectSchema;

  public assign(attrs: any): iExecResult {
    if (!attrs.is_deleted) attrs.is_deleted = 0;
    if (!attrs.id) attrs.id = uuid.v1();

    let validateRes: Joi.ValidationResult = this.schema.validate(attrs);
    if (validateRes.error) {
      print_info("validation error:" + validateRes.error.message, attrs);
      return retError(400, validateRes.error);
    } else {
      this.serialize(attrs);
      return retResult(attrs);
    }
  }

  protected abstract serialize(attrs: any): void;
  public abstract GetAttrs(): any;
}
