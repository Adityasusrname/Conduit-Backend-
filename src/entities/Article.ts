import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity('articles')
export class Articles{

    @PrimaryColumn()
    slug:string

    @Column({nullable:false})
    title:string

    @Column({nullable:false})
    description:string

    @Column({nullable:false})
    body:string

    @Column()
    createdAt:Date

    @Column()
    updatedAt:Date

    @Column({default:false})
    favorited:boolean

    @Column({default:0})
    favouritesCount:Number

    @ManyToOne(()=>User)
    author:User
}





/*
{
    "article": {
      "slug": "how-to-train-your-dragon",
      "title": "How to train your dragon",
      "description": "Ever wonder how?",
      "body": "It takes a Jacobian",
      "tagList": ["dragons", "training"],    //Remaining
      "createdAt": "2016-02-18T03:22:56.637Z",
      "updatedAt": "2016-02-18T03:48:35.824Z",
      "favorited": false,
      "favoritesCount": 0,
      "author": {
        "username": "jake",
        "bio": "I work at statefarm",
        "image": "https://i.stack.imgur.com/xHWG8.jpg",
        "following": false
      }
    }
  }*/