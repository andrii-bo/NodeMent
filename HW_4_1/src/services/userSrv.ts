import { DmlService } from "./dmlService";
import uuid from "uuid";
import { userSchema, TUser } from "../entity/User";
import Joi from "@hapi/joi";
import { iExecResult, retResult, retError, iGetParams } from "../utils";

export class UserSrv extends DmlService {

  public async get(getParams: iGetParams): Promise<TUser[]> {
    let resUsers: TUser[] = [];
    let isLimit: boolean = false;
    let isFilter: boolean = false;

    if (getParams.limit) isLimit = true;
    else isLimit = false;
    if (getParams.filter) isFilter = true;
    else isFilter = false;

    if (this.srvdb.connectionStatus.code === 200) {
      let q = this.srvdb.connection.getRepository(TUser).createQueryBuilder("u").select(" id, name as login,password,age, is_deleted").orderBy("name");
      if (isFilter) q = q.andWhere(" name like '%' || :login || '%'  ");
      if (isLimit) q = q.limit(getParams.limit);
      q.setParameters({ login: getParams.filter });
      let str = q.getQueryAndParameters();
      resUsers = await q.getRawMany();
    };
    return resUsers;
  };

  public merge(getParams: iGetParams): iExecResult {
    let entity: TUser = <TUser>getParams.entity;
    let key_id: string = getParams.id;
    if (!entity.common.is_deleted) entity.common.is_deleted = false;
    if (!entity.common.id) entity.common.id = uuid.v1();

    console.log("Merge start: Database status " + this.srvdb.connectionName + " " + this.srvdb.connectionStatus.code);
    let schemaValidation: Joi.ObjectSchema = userSchema;
    let validateRes: Joi.ValidationResult;
    validateRes = schemaValidation.validate(entity);
    if (validateRes.error) {
      console.log("validation error:" + validateRes.error.message);
      return retError(400, validateRes.error);
    } else {
      this.key_id = key_id;
      if (this.srvdb.connectionStatus.code === 200) {
        const userRepository = this.srvdb.connection.getRepository(TUser);
        userRepository.save(entity);
      }
    }
    return retResult(entity);
  }

  public delete(id: string) {
    if (this.srvdb.connectionStatus.code === 200) {
      this.srvdb.connection.getRepository(TUser).createQueryBuilder().update(TUser).set({ common: { is_deleted: false } }).where("id = :id", { id: id }).execute();
    }
  }
}
