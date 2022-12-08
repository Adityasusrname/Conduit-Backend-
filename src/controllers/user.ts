import { getRepository } from "typeorm"
import { User } from "../entities/User"
import { comparePasssword, hashPassword } from "../utils/password"
import { sanitizePassword } from "../utils/sequrity"

interface userRegistrationData{
    username:string,
    email:string,
    password:string
}

interface userLoginData{
    email:string,
    password:string
}


export async function createUser(data:userRegistrationData):Promise<User>{

        //Checking for data validity
        if(!data.username) throw new Error('Username is not provied!')
        if(!data.password) throw new Error('Password is not provided!')
        if(!data.email)    throw new Error('Email is not provided!')

        const repo = await getRepository(User)

        //Checking if the user exists
        const existingUser = await repo.findOne({
            where:{
              email:data.email
            }
        })

        if(existingUser) throw new Error('User already exists!')

        //Inserting new User
        try{
        const hashedPassword= await hashPassword(data.password)
        const user = new User(data.email,data.username,hashedPassword)
        const newUser = await repo.save(user)
        return newUser
        }
        catch(e) {
            throw e
        }
        


}

export async function loginUser(data:userLoginData):Promise<User> {
      

    //Checking for valid data
    if(!data.email) throw new Error('Email not provided!')
    if(!data.password) throw new Error('Password not provided!')
    
    //Checking with db
    const repo = await getRepository(User)
    const user = await repo.findOne({
        where:{
            email:data.email
        }
    })
    //No user found
    if(!user) throw new Error('User not found!')
    //User is found
    const result = await comparePasssword(data.password,(user.password as string))
    if(result) return user
    else throw Error('Password did not match!')

    
}