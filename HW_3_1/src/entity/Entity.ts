import { Column, Entity, PrimaryColumn } from "typeorm";

export interface iEntity {
    id?: string;
    isDeleted?: boolean;
}

export interface iEntities {
    [id: string]: iEntity;
}

@Entity()
export class TEntity {

    @PrimaryColumn()
    id: string; 

    @Column()
    public is_deleted: boolean;

    constructor(entity:iEntity){
       this.id=entity.id;
       this.is_deleted=entity.isDeleted;
    }
}