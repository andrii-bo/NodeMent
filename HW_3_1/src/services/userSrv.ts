import { DmlService } from "./dmlService";
import uuid from "uuid";
import { userSchema, TUser, Users } from "../entity/User";
import Joi from "@hapi/joi";
import { iExecResult, retResult, retError, iGetParams } from "../utils";
import { Repository } from "typeorm";
import App from "app";

export class UserSrv extends DmlService<TUser> {
  private schemaValidation: Joi.ObjectSchema = userSchema;
  public entities: Users = {};

  init(getParams?: iGetParams) {
    if (getParams.id) {
      this.key_id = getParams.id;
      this.keyEntity = this.entities[this.key_id];
      this.is_key_id = true;
    }
  }

  add(entity: TUser): iExecResult {
    let newUser: TUser = new TUser;
    newUser.assign(entity);
    newUser.is_deleted = false;
    newUser.id = uuid.v1();
    return this.mergeUser(newUser, newUser.id);
  }

  async get(getParams: iGetParams): Promise<TUser[]> {
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

      if (this.is_key_id) {
        resUsers.push(<TUser>this.keyEntity);
      } else {
        resUsers = lSortUsers;
      }
    }
    return resUsers;
  }

  update(entity: TUser) {
    return this.mergeUser(entity, this.key_id);
  }

  mergeUser(entity: TUser, pId: string): iExecResult {
    console.log("Database connection status " + this.srvdb.connectionName + " " + this.srvdb.connectionStatus.code);
    let validateRes: Joi.ValidationResult;
    validateRes = this.schemaValidation.validate(entity);
    if (validateRes.error) {
      console.log("validation error:" + validateRes.error.message);
      return retError(400, validateRes.error);
    } else {
      this.entities[pId] = new TUser;
      this.entities[pId].assign(entity);
      this.key_id = pId;
      this.keyEntity = this.entities[pId];
      if (this.srvdb.connectionStatus.code === 200) {
        console.log("Saving user to DB ");
        const userRepository = this.srvdb.connection.getRepository(TUser);
        userRepository.save(entity);
      }
    }
    return retResult(this.entities[pId]);
  }

  delete(id: string) {
    this.entities[id].is_deleted = false;
    if (this.srvdb.connectionStatus.code === 200) {
      this.srvdb.connection.getRepository(TUser).save(this.entities[id]);
    }
  }
}
