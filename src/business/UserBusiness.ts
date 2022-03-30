import { UserData } from "../data/UserDatabase";
import { LoginInputDTO, SignupInputDTO, User } from "../entities/Users";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";


export class UserBusiness {
    constructor(
      private userData:UserData,
      private idGenerator:IdGenerator,
      private hashManager:HashManager,
      private authenticator:Authenticator
    ){}
  
    async signup(input: SignupInputDTO) {
  
      const {name, email, password} = input
  
      if (!name || !email || !password) {
        throw new Error('All fields are required')
      }
  
      const isUserRegistered = await this.userData.findByEmail(email)
  
      if (isUserRegistered) {
        throw new Error('Email already registered')
      }
  
      const id = this.idGenerator.generateId()
  
      const hashPassword = await this.hashManager.hash(password)
  
      const user = new User(
        id,
        name,
        email,
        hashPassword
      )
  
      await this.userData.insert(user)
  
      const token = this.authenticator.generateToken({id})
  
      return token
    }
    
    async login(input: LoginInputDTO){
        const {email, password} = input
        if(!email || !password){
            throw new Error ("Um ou mais campos estão e branco")
        }
        const isUserRegistered = await this.userData.findByEmail(email)

        if(!isUserRegistered){
            throw new Error("Esse usuário não existe, tente outro email")
        }

        const isPasswordCorrect = this.hashManager.compare(password, isUserRegistered.password)

        if(!isPasswordCorrect){
            throw new Error("Senha incorreta")
        }

        const token = this.authenticator.generateToken({id: isUserRegistered.id})
        return token
    }

}