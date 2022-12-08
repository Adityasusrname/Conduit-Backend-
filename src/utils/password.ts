const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10

export function hashPassword(password:string):Promise<string>{
    return new Promise<string>((resolve,reject)=>{
        bcrypt.hash(password,SALT_ROUNDS,(err:any,hash:string)=>{
            if(err) return reject(err)
            resolve(hash)

        })
    })
    }

