import { Column, PrimaryColumn, BaseEntity } from "typeorm";

export abstract class TDimension extends BaseEntity{
    @PrimaryColumn()
    id: string;

    @Column()
    public name: string;

    @Column()
    public description: string;

    @Column()
    public is_deleted: boolean;

}