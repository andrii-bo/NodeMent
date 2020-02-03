import Joi from '@hapi/joi';
import { iEntity, TEntity } from "./entityMdl";
import { Column, Entity, EntityRepository, Repository  } from "typeorm";

export const userSchema: Joi.ObjectSchema = Joi.object({
    id: Joi.string().required(),
    login: Joi.string().regex(/^\w+/).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.bool().required()
});

export interface IUser extends iEntity {
    login?: string;
    password?: string;
    age?: number;
}


@Entity()
export class TUser /*extends TEntity*/ {

    @Column()
    public id: string;

    @Column()
    public is_deleted: boolean;
    
    @Column()
    public login: string;

    @Column()
    public password: string;

    @Column()
    public age: number;
/*
    constructor(entity: IUser) {
        super(entity);
        this.age = entity.age;
        this.login = entity.login;
        this.password = entity.password;
    }
*/    
}

@EntityRepository(TUser)
export class UserRepository extends Repository<TUser> {
    findByLogin(login: string) {
        return this.findOne({ login });
    }
}