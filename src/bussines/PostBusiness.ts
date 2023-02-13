import { PostDatabase } from "../database/PostDatabase"
import { PostDTO } from "../dtos/PostDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { Post } from "../models/Post"
import { PostDB, UpdatedPost } from "../Types"


export class PostBusiness {

    public getPost = async (q: string | undefined) => {
        const postDatabase = new PostDatabase()
        const postsDB = await postDatabase.findPosts(q)

        const posts: Post[] = postsDB.map((postDB) => new Post(
            postDB.id,
            postDB.creator_id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at
        ))

        return posts
    }

    public createPost = async (input: any) => {

        const { id, creatorId, content, likes, dislikes } = input

        // if (typeof id !== "string") {
        //     throw new BadRequestError("'id' deve ser string")
        // }

        // if (typeof creatorId !== "string") {
        //     throw new BadRequestError("'creatorId' deve ser string")
        // }

        // if (typeof content !== "string") {
        //     throw new BadRequestError("'duration' deve ser string")
        // }

        // if (typeof likes !== "number") {
        //     throw new BadRequestError("'likes' deve ser integer")
        // }

        // if (typeof dislikes !== "number") {
        //     throw new BadRequestError("'dislikes' deve ser integer")
        // }

        const postDatabase = new PostDatabase()
        const postDBExists = await postDatabase.findPostById(id)

        if (postDBExists) {
            throw new BadRequestError("'id' do post já existe")
        }

        const userDatabase = new PostDatabase()
        const userDBExists = await userDatabase.findUserById(creatorId)

        if (!userDBExists) {
            throw new BadRequestError("'id'do usuário não existe")
        }

        const newPost = new Post(
            id,
            creatorId,
            content,
            likes,
            dislikes,
            new Date().toISOString(),
            new Date().toISOString()
        )

        const newPostDB: PostDB = {
            id: newPost.getId(),
            creator_id: newPost.getCreatorId(),
            content: newPost.getContent(),
            likes: newPost.getLikes(),
            dislikes: newPost.getDislikes(),
            created_at: newPost.getCreatedAt(),
            updated_at: newPost.getUpdatedAt()
        }

        postDatabase.insertPost(newPostDB)

        // const output = {
        //     message: "Cadastro realizado com sucesso",
        //     user: newPost
        // }

        const postDTO = new PostDTO()
        const output = postDTO.createPostOutput(newPost)

        return output

    }

    public editPost = async (input: any) => {

        const { id, content, likes, dislikes, updatedAt } = input

        const postDatabase = new PostDatabase()

        if (id[0] !== "p") {
            throw new BadRequestError("'id' deve iniciar com a letra 'p'");
        }

        const post = await postDatabase.findPostById(id)

        if (!post) {
            throw new BadRequestError("post não encontrado")
        }

        const newPost = new Post(
            post.id,
            post.creator_id,
            content || post.content,
            likes || post.likes,
            dislikes || post.dislikes,
            post.created_at,
            updatedAt || post.updated_at
        )

        if (content !== undefined) {
            if (typeof content !== "string") {
                throw new BadRequestError("'content' deve ser string");
            }
            newPost.setContent(content)
            newPost.setUpdatedAt(new Date().toISOString())
        }

        if (likes !== undefined) {
            if (typeof likes !== "number") {
                throw new BadRequestError("'likes' deve ser integer")
            }
            newPost.setLikes(likes)
            newPost.setUpdatedAt(new Date().toISOString())
        }

        if (dislikes !== undefined) {
            if (typeof dislikes !== "number") {
                throw new BadRequestError("'dislikes' deve ser integer")
            }
            newPost.setDislikes(dislikes)
            newPost.setUpdatedAt(new Date().toISOString())
        }

        const newPostDB: UpdatedPost = {
            content: newPost.getContent(),
            likes: newPost.getLikes(),
            dislikes: newPost.getDislikes(),
        }

        postDatabase.editPost(newPostDB, id)

        return ({
            message: "Edição realizada",
            newPost: newPost
        })
    }

    public deletePost = async (id: any) => {

        const postDatabase = new PostDatabase()
        const postDBExists = await postDatabase.findPostById(id)

        if (!postDBExists) {
            throw new BadRequestError("post não encontrado")
        } else {

            await postDatabase.deletePost(id)

            return ({
                message: "Post apagado com sucesso",
            })


        }
    }
}