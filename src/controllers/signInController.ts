import { Request, Response } from "express";
import { UserDatabase } from "../database/UserDatabase";
import { User } from "../models/User";
import { IUserDB } from "../interfaces/interfaces";
import { today } from "../helpers/helpers";
import uuidv4 from 'uuid'
class SignInController {
  async getUserByNickname(req: Request, res: Response) {
    try {
      const {nickname, password} = req.body
      const userDatabase = new UserDatabase();
      const [usersData]= await userDatabase.findUserByNicknames(nickname, password);
      const userFirst = [usersData][0];

      if (!usersData) {
        res.status(404)
        throw new Error( "User not found" );
      } else {
        const result = usersData
       
        res.status(200).json({ message: "User result", result });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error instanceof Error ? error.message : "Unexpected error");
    }
  }
}

export default SignInController;
