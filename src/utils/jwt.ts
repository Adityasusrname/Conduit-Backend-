import { User } from "../entities/User";
import jwt from 'jsonwebtoken'
const SECRET = "secret"


export function generateToken(email:string,username:string):Promise<string>{
    return new Promise<string>((resolve,reject)=>{
        
        jwt.sign({email:email,username:username},SECRET,(err:any,token:string|undefined)=>{
            if(err) reject(err)
          
            resolve(token as string)
        })
    })
}
