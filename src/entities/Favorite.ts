import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Articles } from "./Article";
import { User } from "./User";

@Entity('favorites')
export class Favourite{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @ManyToOne(()=>Articles)
    @JoinColumn({name:'slug'})
    article:Articles
    @ManyToOne(()=>User)
    @JoinColumn({name:'email'})
    by:User
}