import { PrimaryGeneratedColumn, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

export interface iEntity {
    id?: string;
    isDeleted?: boolean;
}

export interface iEntities {
    [id: string]: iEntity;
}

@Entity()
export class TEntity {

    @Column()
    public id: string;

    @Column()
    public isDeleted: boolean;

    constructor(entity:iEntity){
       this.id=entity.id;
       this.isDeleted=entity.isDeleted;
    }
}