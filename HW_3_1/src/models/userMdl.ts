import Joi from '@hapi/joi';
import { iEntity } from "./entityMdl";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

export const userSchema: Joi.ObjectSchema = Joi.object({
    id: Joi.string().required(),
    login: Joi.string().regex(/^\w+/).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.bool().required()
});

export interface IUser extends iEntity{
    login?: string;
    password?: string;
    age?: number;
}


@Entity()
export class TUser {

    @Column()
    public id: string;

    @Column()
    public login: string;

    @Column()
    public password: string;

    @Column()
    public age: number;

    @Column()
    public isDeleted: boolean;
}