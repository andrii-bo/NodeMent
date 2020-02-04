import { Column, Entity, PrimaryColumn ,BaseEntity } from "typeorm";
import Joi from '@hapi/joi';
import { iEntity} from "../entity/Entity";

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
export class TUser extends BaseEntity {

    @PrimaryColumn()
    id: string; 

    @Column()
    public is_deleted: boolean;

    @Column()
    public login: string;

    @Column()
    public password: string;

    @Column()
    public age: number;

    static findByLogin(login: string) {
        return this.createQueryBuilder("u")
            .where("u.login like '%:firstName%'", { login })
            .getMany();
    };
    
    public assign(entity: IUser) {
        this.id=entity.id;
        this.is_deleted=entity.isDeleted; 
        this.age = entity.age;
        this.login = entity.login;
        this.password = entity.password;
    }

/*
    constructor(entity: IUser) {
        this.id=entity.id;
        this.is_deleted=entity.isDeleted; 
        this.age = entity.age;
        this.login = entity.login;
        this.password = entity.password;
    }
*/
}
