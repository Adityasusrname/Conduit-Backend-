import { getRepository } from "typeorm"
import {Articles} from "../entities/Article"
import { User } from "../entities/User"
import { slugify } from "../utils/slug"

interface articleCreationData{
    title:string
    description:string
    body:string
    slug:string
    author:User
}

export async function createArticle(data:articleCreationData):Promise<Articles>{

           //Data validation
           if(!data.title) throw new Error('Title not provided!')
           if(!data.description) throw new Error('Description not provided!')
           if(!data.body) throw new Error('Body not provided!')
           if(!data.author) throw new Error('Author not provided!')

           const slug = slugify(data.title)
           
           //Checking if article already exists
           const repo=await getRepository(Articles)
           const article = await repo.findOne({
            where:{
                slug:slug
            }
           })
           if(article) throw new Error('Article already exists!')

           data.slug = slug
           
           const newArticle =await repo.save(data)

           return newArticle

           

}