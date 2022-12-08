import { createConnection } from "typeorm"
import { Articles } from "./entities/Article"
import { User } from "./entities/User"

const express = require('express')
require('dotenv').config()
const app = express()




async function start(){

    try{
       
        await createConnection({
            type:'postgres',
            username:process.env.USERNAME?.toString(),
            password:process.env.PASSWORD?.toString(),
            database:process.env.DATABASE?.toString(),
            entities:[Articles,User],
            synchronize: true,
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
 

