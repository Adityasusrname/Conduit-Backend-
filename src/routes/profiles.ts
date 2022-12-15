import { Router } from "express";
import { follow } from "../controllers/profile";
import { authToken } from "../middleware/Auth";

const route = Router()

route.post('/:username/follow',authToken, async (req,res)=>{

    try{
        
        if(!(req as any).user) throw new Error('User not found!')

       req.body.followeeUsername = req.params['username']
       req.body.followingEmail = (req as any).user.email

       const profile = await follow(req.body)
       res.status(200).json({profile})

    }

    catch(e){
        res.status(400).json({
            "errors":[(e as Error).message]
        })
    }

    

})

export const profilesRouter = route