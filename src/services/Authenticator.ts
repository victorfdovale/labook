import * as jwt from "jsonwebtoken"
import { AuthenticationData } from "../entities/Users"


export class Authenticator {

    generateToken = (payload: AuthenticationData): string => {
      return jwt.sign(payload, process.env.JWT_KEY as string, {expiresIn: "30min"}
      )
    }
  
    getTokenData = (token: string): any => {
      return jwt.verify(token, process.env.JWT_KEY as string, (err, result) => {
          if (err) return err.message
          return result
        }
      )
    }
  }