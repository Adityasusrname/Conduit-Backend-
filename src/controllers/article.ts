import { getRepository } from "typeorm"
import {Article} from "../entities/Article"
import { User } from "../entities/User"
import { slugify } from "../utils/slug"
import {Comment} from "../entities/Comment"
import { Favourite } from "../entities/Favorite"
import { sanitizePassword } from "../utils/sequrity"

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

interface commentRequest{
    authorEmail:string,
    slug:string,
    body:string
}
interface commentCreationData{
    article:Article
    body:string
    author:User
}
interface favouriteRequest{
    slug:string
    email:string
}
interface favouriteData{
    article:Article
    by:User
}
export async function createArticle(data:articleCreationData):Promise<Article>{

           //Data validation
           if(!data.title) throw new Error('Title not provided!')
           if(!data.description) throw new Error('Description not provided!')
           if(!data.body) throw new Error('Body not provided!')
           if(!data.author) throw new Error('Author not provided!')

           const slug = slugify(data.title)
           
           //Checking if article already exists
           const repo=await getRepository(Article)
           const repoUsers=await getRepository(User)
           const user = await repoUsers.findOne({where:{
            email:data.author.email
           }})
           if(!user) throw new Error('Author not found!')
           const article = await repo.findOne({
            where:{
                slug:slug
            }
           })
           if(article) throw new Error('Article already exists!')

           data.slug = slug
           sanitizePassword(user)
           data.author=user
           
           const newArticle =await repo.save(data)

           return newArticle

           

}

export async function updateArticle(data:articleUpdationData):Promise<Article>{    
            
            const repo = await getRepository(Article)
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

export async function deleteArticle(slug:string):Promise<Boolean>{

    const repo = await getRepository(Article)
    const article = await repo.findOne({
        where:{
            slug:slug
        }
    })

    if(!article) throw new Error('Article not found!')

    const result = await repo.remove(article)

    if(result)
    return true
    else
    return false
  
}

export async  function commentOnArticle(data:commentRequest):Promise<Partial<Comment>>{

    const repoComments = await getRepository(Comment)
    const repoUsers = await getRepository(User)
    const repoArticles = await getRepository(Article)

    const author=await repoUsers.findOne({where:{email:data.authorEmail}})
    const article = await repoArticles.findOne({where:{
        slug:data.slug
    }})

    if(!author)
    throw new Error('Current user not found!')
    if(!article)
    throw new Error('Article not found!')

    const commentToSave:commentCreationData = {

        article:article,
        body:data.body,
        author:author

    }

    console.log(commentToSave)

    const comment = await repoComments.save(commentToSave)

    return comment

}

export async function favoriteArticle(data:favouriteRequest):Promise<Article> {

    const repoArticles = await getRepository(Article)
    const repoUsers = await getRepository(User)
    const repoFavourite = await getRepository(Favourite)

    const article = await repoArticles.findOne({where:{
        slug:data.slug
    },relations:['author']}  )
    if(!article) throw new Error('No article found!')



    const user = await repoUsers.findOne({where:{
        email:data.email
    }})
    if(!user) throw new Error('No user found!')

    const favouriteData:favouriteData = {
        article:article,
        by:user
    } 
    
    console.log(favouriteData.article)
    console.log(favouriteData.by)

    const slug = article.slug
    const email = user.email


    const existing = await repoFavourite.createQueryBuilder('favorites').leftJoinAndSelect('favorites.article','articles').leftJoinAndSelect('favorites.by','users').where('articles.slug=:slug',{slug}).where('users.email=:email',{email}).getOne()

    console.log(existing)

    if(existing)
    {

        const favouriteDataResponse = await repoFavourite.delete(favouriteData)
        article.favorited=false
       
    
    }
    
    else{

        const favouriteDataResponse = await repoFavourite.save(favouriteData)
        article.favorited=true
        
    }

     return article

    



}