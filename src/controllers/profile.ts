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

interface getProfileRequest{
    username:string
    follower:string
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

    const existingFollowingData = await repoFollowing.findOne({where:{
        followee:followeeUser,
        follower:followerUser
    }})
    
    if(existingFollowingData)
    {

        console.log(existingFollowingData)

        await repoFollowing.delete(existingFollowingData)
     

        const profile:Profile={
            username:followeeUser.username,
            bio:followeeUser.bio,
            image:followeeUser.image,
            following:false
        }

        return profile

    }
    else{

    const followingData = await repoFollowing.save(followData)

    const profile:Profile = {
        username:followingData.followee.username,
        bio:followingData.followee.bio,
        image:followingData.followee.image,
        following:true

    }

    return profile

    }
    
    



}

export async function getProfile(data:getProfileRequest):Promise<Profile>{

       const repoUsers = await getRepository(User)
       const repoFollowing = await getRepository(Following)

       const user = await repoUsers.findOne({
        where:{
            username:data.username
        }
       })

       const follower = await repoUsers.findOne({where:{
        email:data.follower
       }})
       
       if(!user)
       throw new Error('Profile with that username not found!')

       if(!follower)
       throw new Error('Current user not found!')

       

       const isFollowing = await repoFollowing.findOne({
        where:{

            followee:user,
            follower:follower
            
        }
       })
       
      
       
       let following = false

       if(isFollowing)
       following=true
       
       
       const profile:Profile={
        username:user.username,
        bio:user.bio,
        image:user.image,
        following:following

       }

       return profile


}