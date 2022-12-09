import {Router} from 'express'
import { createArticle } from '../controllers/article'
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

export const articlesRoute = route