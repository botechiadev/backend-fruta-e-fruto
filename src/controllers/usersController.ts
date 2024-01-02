import { Request, Response } from "express";
import { UserDatabase } from "../database/UserDatabase";
import { User } from "../models/User";
import { IAccountDB, IUserDB } from "../interfaces/interfaces";
import { today } from "../helpers/helpers";
import { v4 as uuidv4 } from 'uuid';
import { UserWithAccount } from "../models/UserWithAccount";
import { AccountsDatabase } from "../database/AccountsDatabase";
class UsersController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const q = req.query.q as string | undefined;
      const userDatabase = new UserDatabase();
      const usersData= await userDatabase.findUsers(q);
      
      if (!usersData[0]) {
        res.status(404)
        throw new Error( "User not found" );
      } else {
        const result:User[] = usersData.map((user)=>{
            return new User(
              user.id,
              user.idProfile,
              user.fullName,
              user.nickname,
              user.password,
              user.email,
              user.avatar,
              user.role,
              user.createdAt
            )
        })
       
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
        const result = new User(
          userFirst.id,
          userFirst.id,
          userFirst.fullName,
          userFirst.nickname,
          userFirst.password,
          userFirst.email,
          userFirst.avatar,
          userFirst.role,
          userFirst.createdAt
        )
        res.status(200).json({ message: "User found", result });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error instanceof Error ? error.message : "Unexpected error");
    }
  }

  async createUser(req: Request, res: Response) {
    try {
    

      const {id, fullName, nickname, email, password, avatar, role } = req.body
    
      const newAccount = uuidv4();


    const newInstanceUser = new UserWithAccount(
      id,
      newAccount,
      fullName,
      nickname,
      password,
      email,
      avatar,
      role,
      today,
      0,
      0,
      today,
      'blue'
    )


    const objUser : IUserDB={
      id: newInstanceUser.getId(),
      idProfile: newInstanceUser.getIdProfile(),
      fullName: newInstanceUser.getFullName(),
      nickname: newInstanceUser.getNickname(),
      password: newInstanceUser.getPassword(),
      email: newInstanceUser.getEmail(),
      avatar: newInstanceUser.getAvatar(),
      role: newInstanceUser.getRole(),
      createdAt: newInstanceUser.getCreatedAt()
    }

    const userDatabase = new UserDatabase()
    await userDatabase.insertUser(objUser)

    const objAccount :IAccountDB={
      id: newInstanceUser.getIdProfile(),
      user_id: newInstanceUser.getId(),
      balance: newInstanceUser.getBalance(),
      score: newInstanceUser.getScore(),
      category: newInstanceUser.getCategory()
    }


    const accountsDatabase = new AccountsDatabase();
    await accountsDatabase.insertAccount(objAccount)



                        

      res.status(201).json({ message: "Usuario criado com sucesso" });
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
