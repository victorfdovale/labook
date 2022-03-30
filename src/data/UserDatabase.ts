import BaseDatabase from './BaseDatabase'
import {User} from '../entities/Users'



export type QueryUser = {
    id: string,
    name: string,
    email: string,
    password: string
  }
  
  export class UserData extends BaseDatabase {
    protected USERS_TABLE = 'labook_users'
  
    insert = async (user: User) => {
      try {
        await BaseDatabase.connection(this.USERS_TABLE).insert(user)
      } catch (error) {
        throw new Error('Não foi possível inserir usuário no banco')
      }
    }
  
    findByEmail = async (email: string): Promise<QueryUser> => {
      try {
        const [queryResult] = await BaseDatabase.connection(this.USERS_TABLE).where({ email })
        return queryResult
      } catch (error) {
        throw new Error('Usuário não encontrado')
      }
    }

    findById = async (id: string): Promise<QueryUser> => {
      try {
        const [queryResult] = await BaseDatabase.connection(this.USERS_TABLE).where({id})
        return queryResult
      } catch (error) {
        throw new Error ('Usuário não encontrado')
      }
      
    }
}

