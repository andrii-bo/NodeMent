import { DmlService } from "./dmlService";
import uuid from "uuid";
import { userSchema, TUser, Users } from "../entity/User";
import Joi from "@hapi/joi";
import { iExecResult, retResult, retError, iGetParams } from "../utils";

export class UserSrv extends DmlService<TUser> {
  private schemaValidation: Joi.ObjectSchema = userSchema;
  public entities: Users = {};

  public async get(getParams: iGetParams): Promise<TUser[]> {
    let resUsers: TUser[] = [];
    let isLimit: boolean = false;
    let isFilter: boolean = false;
    let lSortUsers: TUser[] = [];

    if (getParams.limit) isLimit = true;
    else isLimit = false;
    if (getParams.filter) isFilter = true;
    else isFilter = false;

    if (this.srvdb.connectionStatus.code === 200) {
      return this.srvdb.connection.getRepository(TUser).find();
    } else {
      for (let lKey in this.entities) {
        if (isFilter) {
          if (this.entities[lKey].login.includes(getParams.filter))
            lSortUsers.push(this.entities[lKey]);
        } else lSortUsers.push(this.entities[lKey]);
      }
      if (isLimit) lSortUsers.splice(getParams.limit);

      lSortUsers.sort((a, b) => {
        return a.login.localeCompare(b.login);
      });

      if (this.key_id) {
        resUsers.push(<TUser>this.entities[this.key_id]);
      } else {
        resUsers = lSortUsers;
      }
    }
    return resUsers;
  }

  public merge(getParams: iGetParams): iExecResult {
    let entity:TUser =  <TUser>getParams.entity; 
    let key_id:string =  getParams.id;  
    if (!entity.is_deleted) entity.is_deleted=false;
    if (!entity.id) entity.id=uuid.v1();

    console.log("Database connection status " + this.srvdb.connectionName + " " + this.srvdb.connectionStatus.code);
    let validateRes: Joi.ValidationResult;
    validateRes = this.schemaValidation.validate(entity);
    if (validateRes.error) {
      console.log("validation error:" + validateRes.error.message);
      return retError(400, validateRes.error);
    } else {
      this.entities[key_id] = new TUser;
      this.entities[key_id].assign(entity);
      this.key_id = key_id;      
      if (this.srvdb.connectionStatus.code === 200) {
        console.log("Saving user to DB ");
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
