import { BadRequestError } from "../errors/BadRequestError"
import { Post } from "../models/Post"

export interface CreatePostInputDTO {
    id: string,
    creatorId: string,
    content: string,
    likes: number,
    dislikes: number
}

export interface CreatePostOutputDTO {
    message: string,
    post: {
        id: string,
        creatorId: string,
        content: string,
        likes: number,
        dislikes: number,
        createdAt: string,
        updatedAt: string
    }

}

export class PostDTO {
    public createPostInput(
        id: unknown,
        creatorId: unknown,
        content: unknown,
        likes: unknown,
        dislikes: unknown,
    ): CreatePostInputDTO {
        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string")
        }

        if (typeof creatorId !== "string") {
            throw new BadRequestError("'creatorId' deve ser string")
        }

        if (typeof content !== "string") {
            throw new BadRequestError("'duration' deve ser string")
        }

        if (typeof likes !== "number") {
            throw new BadRequestError("'likes' deve ser integer")
        }

        if (typeof dislikes !== "number") {
            throw new BadRequestError("'dislikes' deve ser integer")
        }

        const dto: CreatePostInputDTO = {
            id,
            creatorId,
            content,
            likes,
            dislikes
        }

        return dto
    }

    public createPostOutput(post: Post): CreatePostOutputDTO{
        const dto: CreatePostOutputDTO = {
            message: "Cadastro realizado com sucesso",
            post: {
                id: post.getId(),
                creatorId: post.getCreatorId(),
                content: post.getContent(),
                likes: post.getLikes(),
                dislikes: post.getDislikes(),
                createdAt: post.getCreatedAt(),
                updatedAt: post.getUpdatedAt() 
        }
    }
    return dto
}
}