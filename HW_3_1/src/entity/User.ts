import { Column, Entity, PrimaryColumn  } from "typeorm";

@Entity("hw_user")
export class TUser /*extends TEntity*/ {

    @PrimaryColumn()
    public id: string;

    @Column()
    public is_deleted: boolean;
    
    @Column()
    public login: string;

    @Column()
    public password: string;

    @Column()
    public age: number;

}
