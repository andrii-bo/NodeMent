import { DmlService } from "./dmlService";
import uuid from "uuid";
import { userSchema, IUser, TUser } from "../models/userMdl";
import Joi from "@hapi/joi";
import { iGetParams, iExecResult ,retResult,retError} from "../utils";

export class UserSrv extends DmlService {
  private schemaValidation: Joi.ObjectSchema = userSchema;

  add(entity: IUser):iExecResult {
    let lUser: IUser = entity;

    lUser.isDeleted = false;
    lUser.id = uuid.v1();
    const newUser = new TUser(lUser);    
    this.connection.getRepository(TUser).save(newUser);
    return this.mergeUser(lUser, lUser.id);
    /*
       const newCustomer = new Customer();
        newCustomer.firstName = customer.firstName;
        newCustomer.lastName = customer.lastName;

        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Customer).save(newCustomer)
    */
  }

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

    /*
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Customer).find();
        */
  }

  update(entity: IUser) {
    return this.mergeUser(entity, this.key_id);
  }

  mergeUser(entity: IUser, pId: string):iExecResult {
    let validateRes: Joi.ValidationResult;
    validateRes = this.schemaValidation.validate(entity);
    if (validateRes.error) {     
      return retError( 400 ,validateRes.error);   
    } else {
      this.entities[pId] = entity;
      this.key_id = pId;
      this.keyEntity = this.entities[pId];
    }
    return retResult(this.entities[pId]);    
    /*
        const connection = await DatabaseProvider.getConnection();
        const repository = connection.getRepository(Customer);
        const entity = await repository.findOneById(customer.id);
        entity.firstName = customer.firstName;
        entity.lastName = customer.lastName;
        return await repository.save(entity);
        */
  }

  delete(id: string) {
    this.entities[id].isDeleted = false;
  }
}
