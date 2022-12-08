import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('users')

export class User
{

    @PrimaryColumn()
    email:String

    @Column({unique:true,nullable:false})
    username:string

    @Column()
    password:string

    @Column({nullable:true})
    bio?:string

    @Column({nullable:true})
    image?:string

    token?:string

    constructor(email:string,username:string,password:string){
          this.email=email
          this.username=username
          this.password=password
    }

    }

/*

"user": {
    "email": "jake@jake.jake",
    "token": "jwt.token.here",
    "username": "jake",
    "bio": "I work at statefarm",
    "image": null
  }

*/