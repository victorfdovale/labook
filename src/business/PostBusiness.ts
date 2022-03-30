import { UserData } from '../data/UserDatabase'
import {NewPostDTO, TYPE} from '../entities/Post' 
import { Authenticator } from '../services/Authenticator'
import { IdGenerator } from '../services/IdGenerator'
import {Temporal} from '@js-temporal/polyfill'
import {Post} from '../entities/Post'
import { PostDataBase } from '../data/PostDatabase'

export class PostBusiness {
    constructor(
        private authenticator: Authenticator,
        private userData: UserData,
        private idGenerator: IdGenerator,
        private postDataBase: PostDataBase
    ){}

    newPost = async(input: NewPostDTO, token: string) =>{
        const {picture, description, type} = input

        if(!token){
            throw new Error ('Faça o login novamente')
        }
        
        const data = this.authenticator.getTokenData(token)

        if(data === 'jwt expired'){
            throw new Error ('Token expirou, faça novamente o login')
        }
        if(!data){
            throw new Error ('Faça o login')
        }
        const userId = data.id

        const userAuthorized = await this.userData.findById(userId)

        if(!userAuthorized){
            throw new Error ('Usuário não autorizado. Faça login para entrar')
        }

        if(!picture || !description || !type){
            throw new Error ('Um ou mais campos estão e branco')
        }

        if(type.toLowerCase() !== TYPE.normal && type.toLowerCase() !== TYPE.event){
            throw new Error ('Tipo da postagem deve ser normal ou event')
        }
        const id = this.idGenerator.generateId()

        const created_at = Temporal.Now.plainDateISO().toString()

        const post = new Post(id, userId, picture, description, created_at, type)
        
        await this.postDataBase.insert(post)
    }

    findPostById = async (postId: string, token: string) : Promise<Post> => {
        if(!token){
            throw new Error ('É necessário token de autenticação')
        }
        const data = this.authenticator.getTokenData(token)

        if(data === 'jwt expired'){
            throw new Error ('Token expirou, faça login novamente')
        }

        const userId = data.id

        const userAuthorized = this.userData.findById(userId)
        console.log('Usuário autorizado', userAuthorized)

        if(!userAuthorized){
            throw new Error('Usuário não autorizado')
        }
        if(!postId){
            throw new Error('Informe o Id do post')
        }
        return this.postDataBase.findPostById(postId)
    }
}