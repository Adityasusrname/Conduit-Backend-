import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('followers')
export class Following{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @ManyToOne(()=>User)
    @JoinColumn({name:'followee'})
    followee:User

    @ManyToOne(()=>User)
    @JoinColumn({name:'follower'})
    follower:User
}