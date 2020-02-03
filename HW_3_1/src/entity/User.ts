import { Column, Entity, PrimaryColumn  } from "typeorm";
import Joi from '@hapi/joi';
import { iEntity, TEntity } from "../entity/Entity";

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

@Entity("hw_user")
export class TUser extends TEntity {

    @PrimaryColumn()
    public id: string;

    @Column()
    public is_deleted: boolean;
    
    @Column()
    public login: string;

    @Column()
    public password: string;

    @Column()
    public age: number;

    constructor(entity: IUser) {
        super(entity);
        this.age = entity.age;
        this.login = entity.login;
        this.password = entity.password;
    }

}
