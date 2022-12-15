import { profile } from "console";
import { getRepository } from "typeorm";
import { Following } from "../entities/Following";
import { User } from "../entities/User";

interface followDataRequest{
    followeeUsername:string
    followingEmail:string
    
}

interface followData{
    follower:User
    followee:User
}

interface Profile{
    username:string
    bio:string|undefined
    image:string|undefined
    following:boolean
}

export async function follow(data:followDataRequest):Promise<Profile>{


    const repoFollowing = await getRepository(Following)
    const repoUsers = await getRepository(User)

    const followeeUser= await  repoUsers.findOne({where:{
        username:data.followeeUsername
    }})
    
    const followerUser = await repoUsers.findOne({where:{
        email:data.followingEmail
    }})
 
    if(!followeeUser)
    throw new Error('Followee User is not found!')
   
    if(!followerUser)
    throw new Error('Follower user is not found!')


    const followData:followData = {
        follower:followerUser,
        followee:followeeUser
    }
    
    
    console.log(data)

    
    const followingData = await repoFollowing.save(followData)

    const profile:Profile = {
        username:followingData.followee.username,
        bio:followingData.followee.bio,
        image:followingData.followee.image,
        following:true

    }

    return profile



}