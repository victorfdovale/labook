import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { LoginInputDTO, SignupInputDTO } from "../entities/Users";




export class UserController {

    constructor(
      private userBusiness: UserBusiness
    ) { }
  
    signup = async (req: Request, res: Response): Promise<void> => {
      const {name, email, password} = req.body
  
      const input: SignupInputDTO = {
        name, 
        email, 
        password
      }
  
      try {
        const token = await this.userBusiness.signup(input)
  
        res.status(201).send({message: 'User registered successfully', token})
      } catch (error: any) {
        res.status(500).send("Erro ao cadastrar usuário")

      }
    }

    login = async(req: Request, res: Response) => {
      const {email, password} = req.body
      const input: LoginInputDTO = {
        email,
        password
      }
      try {
        const token = await this.userBusiness.login(input)
        res.status(200).send({message: "Login realizado com sucesso", token})

      } catch (error) {
        res.status(500).send("Erro ao realizar login")
      }
    }

    
}