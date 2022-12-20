import { createConnection } from "typeorm"
import { Article } from "./entities/Article"
import { Following } from "./entities/Following"
import {Comment} from "./entities/Comment"
import { User } from "./entities/User"
import { articlesRoute } from "./routes/articles"
import { profilesRouter } from "./routes/profiles"
import { userRoute } from "./routes/user"
import { usersRoute } from "./routes/users"
import { Favourite } from "./entities/Favorite"

const express = require('express')
require('dotenv').config()
const app = express()
app.use(express.json())


app.use('/api/users',usersRoute)
app.use('/api/user',userRoute)
app.use('/api/articles',articlesRoute)
app.use('/api/profiles',profilesRouter)

async function start(){

    try{
       
        await createConnection({
            type:'postgres',
            username:process.env.USERNAME?.toString(),
            password:process.env.PASSWORD?.toString(),
            database:process.env.DATABASE?.toString(),
            entities:[Article,User,Following,Comment,Favourite],
            synchronize: true,
            dropSchema:true,
            logging:true,
            logger: "advanced-console"
        })
    }

    catch(e){
        console.log((e as Error).message)
    }


    app.listen(process.env.PORT,(req: any,res: any)=>{
        console.log("Hello World!")
        
    })

   
    
        


}


start()
 

