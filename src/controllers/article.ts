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

interface articleUpdationData{
    slug:string
    title?:string
    description?:string
    body?:string
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

export async function updateArticle(data:articleUpdationData):Promise<Articles>{
            
            const repo = await getRepository(Articles)
            const article = await repo.findOne({
                where:{
                    slug:data.slug
                }
            })
            if (!article) throw new Error('No article found!')

            if(data.title){
                article.title = data.title
                article.slug = slugify(data.title)
            } 
            if(data.description)
            article.description = data.description
            if(data.body) 
            article.body = data.body

            const newArticle = await repo.save(article)
            return newArticle

}