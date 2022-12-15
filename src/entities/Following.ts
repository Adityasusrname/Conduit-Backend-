import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('followers')
export class Following{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @OneToOne(()=>User)
    @JoinColumn()
    followee:User

    @OneToOne(()=>User)
    @JoinColumn()
    follower:User
}