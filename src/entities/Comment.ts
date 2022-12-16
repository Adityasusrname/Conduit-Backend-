import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Articles } from "./Article";
import { User } from "./User";


@Entity('comments')
export class Comment{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @ManyToOne(()=>Articles)
    article:Articles

    @Column()
    body:string

    @ManyToOne(()=>User)
    author:User

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date
}