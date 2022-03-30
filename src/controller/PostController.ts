import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { NewPostDTO } from "../entities/Post";


export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ){}

    newPost = async(req: Request, res: Response) => {
        const {picture, description, type} = req.body
        const token = req.headers.authorization as string
        const input : NewPostDTO = {
            picture,
            description,
            type
        }
        try {
         await this.postBusiness.newPost(input, token) 
         res.status(201).send({message: 'Publicado!'})  
        } catch (error: any) {
            res.status(400).send({message: error.message || error.sqlMessage})
        }
    }

    findPostById = async(req: Request, res: Response) => {
        const postId = req.params.id
        const token = req.headers.authorization as string
        try {
            const post = await this.postBusiness.findPostById(postId, token)
            res.status(200).send({post})

        } catch (error: any) {
            res.status(400).send({message: error.message || error.sqlMessage})
        }
    }
}