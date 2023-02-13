import { Request, Response } from "express"
import { PostBusiness } from "../bussines/PostBusiness"
import { PostDatabase } from "../database/PostDatabase"
import { PostDTO } from "../dtos/PostDTO"
import { BaseError } from "../errors/BaseError"
import { Post } from "../models/Post"
import { UpdatedPost } from "../Types"

export class PostController {

    constructor(
        private postDTO: PostDTO,
        private postBusiness: PostBusiness

    ){}

    public getPosts = async (req: Request, res: Response) => {
        try {
            const q = req.query.q as string | undefined

            //const postBusiness = new PostBusiness()
            const output = await this.postBusiness.getPost(q)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
    //create
    public createPost = async (req: Request, res: Response) => {
        try {
            // const input = {
            //     id: req.body.id,
            //     creatorId: req.body.creator_id,
            //     content: req.body.content,
            //     likes: req.body.likes,
            //     dislikes: req.body.dislikes,
            //     created_at: req.body.created_at,
            //     updated_at: req.body.updated_at
            // }

            //const postDTO = new PostDTO()
            const input = this.postDTO.createPostInput(
                req.body.id,
                req.body.creator_id,
                req.body.content,
                req.body.likes,
                req.body.dislikes 
            )

            const userBusiness = new PostBusiness()
            const output = await userBusiness.createPost(input)


            res.status(201).send(output)
        } catch (error) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public editPost = async (req: Request, res: Response) => {
        try {

            const input ={
                id: req.params.id,
                content: req.body.content,
                updatedAt: req.body.updated_at
            }

            //const postBusiness = new PostBusiness()
            const output = await this.postBusiness.editPost(input)

            res.status(200).send(output)


        } catch (error) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public deletePost = async (req: Request, res: Response) => {
        try {
            const id = req.params.id

            //const postBusiness = new PostBusiness()
            const output = await this.postBusiness.deletePost(id)
            
            res.status(200).send(output)

        } catch (error) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}