import { errorMonitor } from 'events'
import {Router} from 'express'
import { commentOnArticle, createArticle, deleteArticle, favoriteArticle, updateArticle } from '../controllers/article'
import { User } from '../entities/User'
import { authToken } from '../middleware/Auth'
import { sanitizePassword } from '../utils/sequrity'

const route = Router()

route.post('/',authToken,async (req,res)=>{
    try{
        if(!(req as any).user) throw new Error('User not found!')
        req.body.article.author = (req as any).user
        const article = await createArticle(req.body.article)
        res.status(200).json({article})
    }
    catch(e){
        res.status(400).json({
            "errors":[(e as Error).message]
        })
    }
})

route.patch('/:slug',authToken,async (req,res)=>{
    try{
        if(!(req as any).user) throw new Error('User not found!')
        req.body.article.slug = req.params['slug']
        const article = await updateArticle(req.body.article)
        res.status(200).json({article})
    }
    catch(e){
        res.status(400).json({
            "errors":[(e as Error).message]
        })
    }
})

route.delete('/:slug',authToken,async (req,res)=>{
    try{
        if(!(req as any).user) throw new Error('User not found!')
        const slug = req.params['slug']
        const result = await deleteArticle(slug)
        res.status(200).json({result})
    }
    catch(e){
        res.status(400).json({
            "errors":[(e as Error).message]
        })
    }
    
})

route.post('/:slug/comments',authToken,async (req,res)=>{

    try{
        if(!(req as any).user) throw new Error('User not found!')
        const slug = req.params['slug']
        req.body.authorEmail=(req as any).user.email
        req.body.slug=slug
        req.body.body = req.body.comment.body
        const comment = await commentOnArticle(req.body)
        delete comment.article
        sanitizePassword(comment.author as User)
        res.status(200).json({comment})
    }
    catch(e){
        res.status(400).json({
            "errors":[(e as Error).message]
        })
    }

})

route.post('/:slug/favorite',authToken,async (req,res)=>{

    try{
        if(!(req as any).user) throw new Error('User not found!')
        const slug = req.params['slug']
        if(!slug)
        throw new Error('Slug not found!')
        req.body.email = (req as any).user.email
        req.body.slug = slug
        const article = await favoriteArticle(req.body)
        res.status(200).json({article})
    }
    catch(e)
    {
         res.status(400).json({
            "errors":[(e as Error).message]
         })
    }

})

export const articlesRoute = route