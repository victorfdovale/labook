import { Post } from "../entities/Post";
import BaseDatabase from "./BaseDatabase";


export class PostDataBase extends BaseDatabase {
    insert = async (post : Post) => {
        try {
            await BaseDatabase.connection('labok_posts').insert(post)
        } catch (error: any) {
            throw new Error ("Não foi possível" || error.sqlMessage)
        } 
    }
    findPostById = async(postId: string) => {
        try {
            const [queryResult] = await BaseDatabase.connection('labok_posts').where({id: postId})
            return queryResult
        } catch (error: any) {
            throw new Error(error.sqlMessage)
        }   
    }
}