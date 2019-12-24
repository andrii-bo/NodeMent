import * as joi from '@hapi/joi';

const Joi = joi;

export const userSchema = {
    id: Joi.string().required(),
    login: Joi.string().regex(/^\w+/).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.bool().required()
};

export interface iUser {
    id: string;
    login: string;
    password: string;
    age: string;
    isDeleted: string;
}


export interface iUsers {
    [id: string]: iUser;
}
