import { DmlService } from "./dmlService";
import uuid from "uuid";
import { userSchema, TUser } from "../entity/User";
import Joi from "@hapi/joi";
import { iExecResult, retResult, retError, iGetParams } from "../utils";
import { Repository } from "typeorm";

export class UserSrv extends DmlService<TUser> {  
  private schemaValidation: Joi.ObjectSchema = userSchema;    

  add(entity: TUser): iExecResult {
    entity.is_deleted = false;
    entity.id = uuid.v1();
    this.mergeUser(entity, entity.id);
    return retResult(entity);
  }

  get(getParams: iGetParams): TUser[] {
    let resUsers: TUser[] = [];
    let isLimit: boolean = false;
    let isFilter: boolean = false;
    let lSortUsers: TUser[] = [];

    if (getParams.limit) isLimit = true;
    else isLimit = false;
    if (getParams.filter) isFilter = true;
    else isFilter = false;

    if (this.db.connectionStatus.code === 200) {
      for (let lKey in this.dbRepository.find()) {
        lSortUsers.push;
      }
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
    
    let validateRes: Joi.ValidationResult;
    validateRes = this.schemaValidation.validate(entity);
    if (validateRes.error) {
      return retError(400, validateRes.error);
    } else {
      this.entities[pId] = entity;
      this.key_id = pId;
      this.keyEntity = this.entities[pId];
    }
    if (this.db.connectionStatus.code === 200) {
      const userRepository = this.db.connection.getRepository(TUser);
      userRepository.save(entity);
    }
    return retResult(this.entities[pId]);
  }

  delete(id: string) {
    this.entities[id].isDeleted = false;
    if (this.db.connectionStatus.code === 200) {
      let dbUser: TUser = new TUser();
      this.dbRepository.save(this.entities[id]);
    }
  }
}
