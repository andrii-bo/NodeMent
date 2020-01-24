import Joi from '@hapi/joi';

export const userSchema: Joi.ObjectSchema = Joi.object({
    id: Joi.string().required(),
    login: Joi.string().regex(/^\w+/).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.bool().required()
});

export interface iUser {
    id?: string;
    login?: string;
    password?: string;
    age?: number;
    isDeleted?: boolean;
}

export interface iUsers {
    [id: string]: iUser;
}
