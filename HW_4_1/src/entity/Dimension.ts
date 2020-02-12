import { Column, PrimaryColumn } from "typeorm";

export abstract class TDimension {
    @PrimaryColumn()
    id: string;

    @Column()
    public name: string;

    @Column()
    public description: string;

    @Column()
    public is_deleted: boolean;

}