import { DmlService } from "./dmlService";
import uuid from "uuid";
import { userSchema, IUser } from "../models/userMdl";
import Joi from "@hapi/joi";
import {  iExecResult, retResult, retError, iGetParams } from "../utils";
import { TUser } from "../entity/User";


export class UserSrv extends DmlService {
  private schemaValidation: Joi.ObjectSchema = userSchema;

  add(entity: IUser): iExecResult {
    let lUser: IUser = entity;

    lUser.isDeleted = false;
    lUser.id = uuid.v1();

    if (this.db.connectionStatus.code === 200) {
      //let newUser: TUser = new TUser(lUser);
      const userRepository = this.db.connection.getRepository(TUser);
      const user = userRepository.create()
      user.id="1";
      userRepository.save(user);
    }

    this.mergeUser(lUser, lUser.id);
    return retResult(lUser);
  };

  get(getParams: iGetParams): IUser[] {
    let resUsers: IUser[] = [];
    let isLimit: boolean = false;
    let isFilter: boolean = false;
    let lSortUsers: IUser[] = [];
    if (getParams.limit) isLimit = true;
    else isLimit = false;
    if (getParams.filter) isFilter = true;
    else isFilter = false;

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
      resUsers.push(this.keyEntity);
    } else {
      resUsers = lSortUsers;
    }

    return resUsers;

  }

  update(entity: IUser) {
    return this.mergeUser(entity, this.key_id);
  }

  mergeUser(entity: IUser, pId: string): iExecResult {
    let validateRes: Joi.ValidationResult;
    validateRes = this.schemaValidation.validate(entity);
    if (validateRes.error) {
      return retError(400, validateRes.error);
    } else {
      this.entities[pId] = entity;
      this.key_id = pId;
      this.keyEntity = this.entities[pId];
    }
    return retResult(this.entities[pId]);
    
  }

  delete(id: string) {
    this.entities[id].isDeleted = false;
  }
}
