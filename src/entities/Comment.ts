import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Article } from "./Article";
import { User } from "./User";


@Entity('comments')
export class Comment{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @ManyToOne(()=>Article)
    @JoinColumn({name:'article'})
    article:Article

    @Column()
    body:string

    @ManyToOne(()=>User)
    @JoinColumn({name:'author'})
    author:User

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date
}