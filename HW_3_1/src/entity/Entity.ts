export interface iEntity {
    id?: string;
    is_deleted?: boolean;
    assign(entity: any):void;
}

export interface iEntities {
    [id: string]: iEntity;
}

