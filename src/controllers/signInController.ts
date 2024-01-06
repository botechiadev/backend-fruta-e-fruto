import dotenv from 'dotenv'
dotenv.config()
import { NextFunction, Request, Response } from "express";
import { UserDatabase } from "../database/UserDatabase";
import { User } from "../models/User";
import { IUserDB } from "../interfaces/interfaces";
import { today } from "../helpers/helpers";
import uuidv4 from 'uuid'
import jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt'

class SignInController {
  async postAuth(req: Request, res: Response) {
    try {
      const {nickname, password} = req.body
      const userDatabase = new UserDatabase();
      const [usersData]= await userDatabase.findUserByNickname(nickname);
      const userFirst = [usersData][0];

      if (!usersData) {
        res.status(401)
        throw new Error( "401 nickname INVALIDO" );
      } else {
        const dataHash = usersData
       
        const confirmHash = await bcrypt.compare(password , dataHash.password)

       if(!confirmHash){
        res.status(401)
        throw new Error('"401" : Senha invalida')
       }

       const token = jwt.sign({
        id: dataHash.id
      },
      process.env.JWT_KEY ?? "" ,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
      )

      const user = dataHash

      const {
        password: _,
        ...userLogin
      } = user

      res.status(200).json({ message: "User result",
       token,
       user: userLogin
      });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error instanceof Error ? error.message : "Unexpected error");
    }
  }
  async getProfile(req: Request, res: Response) {
    try {


 const result = req.user
      res.status(200).json({message: "Usuario Autorizado", result })
    
    } catch (error) {
      console.error(error);
      res.status(500).send(error instanceof Error ? error.message : "Unexpected error");
    }
  }}

export default SignInController;
