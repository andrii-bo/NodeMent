import { DmlService } from "./dmlService";
import uuid from "uuid";
import { userSchema, TUser, Users } from "../entity/User";
import Joi from "@hapi/joi";
import { iExecResult, retResult, retError, iGetParams, print_info } from "../utils";

export class UserSrv extends DmlService {

  public entities: Users = {};

  public async get(getParams: iGetParams): Promise<TUser[]> {
    let resUsers: TUser[] = [];
    let isLimit: boolean = false;
    let isFilter: boolean = false;

    if (getParams.limit) isLimit = true;
    else isLimit = false;
    if (getParams.filter) isFilter = true;
    else isFilter = false;

    if (this.srvdb.connectionStatus.code === 200) {

      //resUsers = await this.srvdb.connection.getRepository(TUser).find();
      let q = this.srvdb.connection.getRepository(TUser).createQueryBuilder("u").select(" id, name as login,password,age, is_deleted").orderBy("login");
      if (isFilter) q = q.where("u.name like '%' || :login || '%'  ");
      if (isLimit) q = q.limit(getParams.limit);
      q.setParameters({ login: getParams.filter });
      let str = q.getQueryAndParameters();
      resUsers = await q.getRawMany();
      /*
               resUsers = await this.srvdb.connection.getRepository(TUser).createQueryBuilder("u")
              .select("*")
              .getMany();
      
          };
      /*
          if (this.key_id) {
            resUsers.push(<TUser>this.entities[this.key_id]);
          } else {
            resUsers = lSortUsers;
          }
      */
    };
    return resUsers;
  };

  public merge(getParams: iGetParams): iExecResult {
    let entity: TUser = <TUser>getParams.entity;
    let key_id: string = getParams.id;
    if (!entity.is_deleted) entity.is_deleted = false;
    if (!entity.id) entity.id = uuid.v1();

    console.log("Merge start: Database status " + this.srvdb.connectionName + " " + this.srvdb.connectionStatus.code);
    let schemaValidation: Joi.ObjectSchema = userSchema;
    let validateRes: Joi.ValidationResult;
    validateRes = schemaValidation.validate(entity);
    if (validateRes.error) {
      console.log("validation error:" + validateRes.error.message);
      return retError(400, validateRes.error);
    } else {
      this.entities[key_id] = new TUser;
      this.entities[key_id].assign(entity);
      this.key_id = key_id;
      if (this.srvdb.connectionStatus.code === 200) {
        const userRepository = this.srvdb.connection.getRepository(TUser);
        userRepository.save(entity);
      }
    }
    return retResult(this.entities[key_id]);
  }

  public delete(id: string) {
    this.entities[id].is_deleted = false;
    if (this.srvdb.connectionStatus.code === 200) {
      this.srvdb.connection.getRepository(TUser).save(this.entities[id]);
    }
  }
}
