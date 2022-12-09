import { verifyToken } from "../utils/jwt"

export async function authToken(req:any,res:any,next:any){
    try{
        const token = req.headers.authorization.split(' ')[1]
        const user = await verifyToken(token)
        req.user=user
        return next()
    }

    catch(e){
        res.status(400).json({
            "errors":[(e as Error).message]
        })
    }
   
    
}