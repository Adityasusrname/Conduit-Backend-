import {Router, urlencoded} from 'express'
import { createUser } from '../controllers/user'
import { User } from '../entities/User'
import { generateToken } from '../utils/jwt'
import { sanitizePassword } from '../utils/sequrity'


const route = Router()

route.post('/',async (req,res)=>{
    try{
        
        const user = await createUser(req.body.user)
        sanitizePassword(user)
        const token = await generateToken(user.email,user.username)
        user.token = token
        res.status(200).json({user})
    }
    catch(e){
        res.status(400).json({
            "errors":{
                "body":[(e as Error).message]
            }
        })
    }
   
})

export const usersRoute = route