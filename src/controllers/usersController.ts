import { Request, Response } from "express";
import { UserDatabase } from "../database/UserDatabase";
import { User } from "../models/User";
import { IUserDB } from "../interfaces/interfaces";
import { today } from "../helpers/helpers";
import uuidv4 from 'uuid'
class UsersController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const q = req.query.q as string | undefined;
      const userDatabase = new UserDatabase();
      const [usersData]= await userDatabase.findUsers(q);
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

  async getUserById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const userDatabase = new UserDatabase();
      const usersDB = await userDatabase.findUserById(id);
      const userFirst = usersDB[0];

      if (!userFirst) {
        res.status(404).json({ message: "User not found" });
      } else {
        const result = usersDB
        res.status(200).json({ message: "User found", result });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error instanceof Error ? error.message : "Unexpected error");
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const result = {
        id: Math.random().toString()
      }
      // ... (seu código existente para a criação de usuário)
      res.status(201).json({ message: "User created successfully", result });
    } catch (error) {
      console.error(error);
      res.status(500).send(error instanceof Error ? error.message : "Unexpected error");
    }
  }

  async editUserById(req: Request, res: Response) {
    try {
      const result = {
        id: Math.random().toString()
      }
      // ... (seu código existente para a edição de usuário)
      res.status(200).json({ message: "User updated successfully", result });
    } catch (error) {
      console.error(error);
      res.status(500).send(error instanceof Error ? error.message : "Unexpected error");
    }
  }

  async destroyUser(req: Request, res: Response) {
    try {
      // ... (seus código existente para a exclusão de usuário)
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send(error instanceof Error ? error.message : "Unexpected error");
    }
  }
}

export default UsersController;
