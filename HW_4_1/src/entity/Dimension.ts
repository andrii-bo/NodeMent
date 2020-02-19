import Joi from "@hapi/joi";
import { Column, PrimaryColumn, BaseEntity } from "typeorm";
import { iExecResult, retResult, print_info, retError } from "../utils";
import uuid = require("uuid");

export class TDimension extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    public name: string;

    @Column()
    public description: string;

    @Column()
    public is_deleted: number;

    protected schema: Joi.ObjectSchema;

    public assign(attrs: any): iExecResult {

        if (!attrs.is_deleted) attrs.is_deleted = 0;
        if (!attrs.id) attrs.id = uuid.v1();

        let validateRes: Joi.ValidationResult = this.schema.validate(attrs);
        if (validateRes.error) {
            print_info("validation error:" + validateRes.error.message, attrs);
            return retError(400, validateRes.error);
        } else {
            this.serialize(attrs);
            return retResult(attrs);
        }
    };

    protected serialize(attrs: any): void {
        this.id = attrs.id;
        this.is_deleted = attrs.is_deleted;
        this.name = attrs.name;
        this.description = attrs.description;
    };


}