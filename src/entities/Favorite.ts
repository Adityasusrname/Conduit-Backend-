import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./Article";
import { User } from "./User";

@Entity('favorites')
export class Favourite{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @ManyToOne(()=>Article)
    @JoinColumn({name:'slug'})
    article:Article
    @ManyToOne(()=>User)
    @JoinColumn({name:'by'})
    by:User
}