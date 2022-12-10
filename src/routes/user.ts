import {Router} from 'express'
import { getUser, updateUser } from '../controllers/user'
import { authToken } from '../middleware/Auth'
import { sanitizePassword } from '../utils/sequrity'
const route = Router()

route.get('/',authToken,async (req,res)=>{
    try{
        if(!(req as any).user) throw new Error('User not found!')
        const user = await getUser((req as any).email)
        sanitizePassword(user)
        res.status(200).json({user})
    }
    catch(e){
        res.status(400).json({
            "errors":[(e as Error).message]
         } )
        }})

route.patch('/',authToken,async (req,res)=>{
    try{
        if(!(req as any).user) throw new Error('User not found!')
        const user = await updateUser(req.body.user)
        sanitizePassword(user)
        res.status(200).json({user})
    }
    catch(e){
        res.status(400).json({
            "errors":[(e as Error).message]
        })
    }
})

export const userRoute = route