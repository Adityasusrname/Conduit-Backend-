import { getRepository } from "typeorm"
import { User } from "../entities/User"
import { hashPassword } from "../utils/password"

interface userRegistrationData{
    username:string,
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