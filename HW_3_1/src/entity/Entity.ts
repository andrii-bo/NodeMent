export interface iEntity {
    id?: string;
    isDeleted?: boolean;
}

export interface iEntities {
    [id: string]: iEntity;
}

