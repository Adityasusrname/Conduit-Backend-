import {Router} from 'express'
import { createArticle, updateArticle } from '../controllers/article'
import { authToken } from '../middleware/Auth'

const route = Router()

route.post('/',authToken,async (req,res)=>{
    try{
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

export const articlesRoute = route