import express from "express"
import { PostBusiness } from "../bussines/PostBusiness"
import { PostController } from "../controller/PostController"
import { PostDTO } from "../dtos/PostDTO"

export const postRouter = express.Router()


const postController = new PostController(
    new PostDTO(),
    new PostBusiness()
)

postRouter.get("/", postController.getPosts)
postRouter.post("/", postController.createPost)
postRouter.put("/:id", postController.editPost)
postRouter.delete("/:id", postController.deletePost)