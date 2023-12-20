/*import { Request, Response } from "express";
import { UserDatabase } from "../database/UserDatabase";
import { User } from "../models/User";
import { IUserDB } from "../interfaces/interfaces";
import { today } from "../helpers/helpers";

export const getAllUsers = (async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string | undefined
    let usersDB

    const userDatabase = new UserDatabase()
     const usersData:IUserDB[]|undefined[] = await userDatabase.findUsers(q)
     const userFirst = usersData[0]

     if(!userFirst){
       res.status(404)
       throw new Error("404: User not Found")
     }else{

     const result: User[] = usersData.map(
      (userDB:IUserDB) =>(
            new User(    
                userDB.id,
                userDB.fullName,
                userDB.nickname,
                userDB.email,
                userDB.createdAt,
                userDB.password,
                userDB.avatar,
                userDB.role
            )
      )
    );

    res.status(200).json({ message: "Resultado usuarios", result });
    }


  
  
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});
export const getUserById = (async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const userDatabase = new UserDatabase()
    const usersDB = await userDatabase.findUserById(id)

    const userFirst = usersDB[0]

    if(!userFirst){
      res.status(404)
      throw new Error("404: User not Found")
    }

    const result: User[] = usersDB.map(
      (userDB:IUserDB) =>
            new User(
              userDB.id,
              userDB.name,
              userDB.nickname,
              userDB.password,
              userDB.email,
              userDB.created_at,
              userDB.avatar_img,
              userDB.role
            )
    );


      res.status(200).json({ message: "USUARIO ENCONTRADO", result });
    
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

export const createUser = async (req: Request, res: Response) => {
  try {
    const cpfCnpj = req.body.inputCpfCnpj as string;
    const name = req.body.inputName as string | undefined;
    const nickname = req.body.inputNickname as string | undefined;
    const email = req.body.inputEmail as string | undefined;
    const password = req.body.inputPassword as string | undefined;
    const role = req.body.inputRole as string | undefined;
    const avatar = req.body.inputAvatar as string | undefined;

    const today = new Date().toISOString()

    if (typeof email !== "string") {
      res.status(400).send("email invalido");
    }

    if (typeof password !== "string") {
      throw new Error("'password ' deve ser uma string");
    }
    // o método de string .match() verifica se existe o padrão,
    // caso exista ele retorna um array com os valores encontrados
    // caso não exista ele retorna null (por isso o !)
    if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g
      )
    ) {
      throw new Error(
        "'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial"
      );
    }
    const newUser: User = new User(
      cpfCnpj,
      name,
      nickname,
      email,
      password,
      today,
      avatar,
      role
    );

  const user4Insert: IUserDB = {
    id: newUser.getId(),
    name: newUser.getName(),
    nickname: newUser.getNickname(),
    email: newUser.getEmail(),
    password: newUser.getPassword(),
    created_at: newUser.getCreatedAt(),
    avatar_img: newUser.getAvatar(),
    role: newUser.getRole()
  }


  const userDatabase = new UserDatabase()

    await userDatabase.insertUser(user4Insert)
    const usersDB:IUserDB[]|undefined[] = await userDatabase.findUserById(user4Insert.id)

    const result: User[] = usersDB.map(
      (userDB:IUserDB) =>
            new User(
              userDB.id,
              userDB.name,
              userDB.nickname,
              userDB.password,
              userDB.email,
              userDB.created_at,
              userDB.avatar_img,
              userDB.role
            )
    );
    
    res.status(201).json({ message: "usuario cadastrado com sucesso" , result});

  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
};

export const editUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const cpfCnpj = req.body.inputCpfCnpj as string;
    const name = req.body.inputName as string | undefined;
    const nickname = req.body.inputNickname as string | undefined;
    const email = req.body.inputEmail as string | undefined;
    const password = req.body.inputPassword as string | undefined;
    const role = req.body.inputRole as string | undefined;
    const avatar = req.body.inputAvatar as string | undefined;
    const today = new Date().toISOString()

    if (name) {
      if (typeof name !== "string") {
        res.status(400);
        throw new Error("Nome do produto deve ser do tipo string");
      }
    }

    if (nickname) {
      if (typeof nickname !== "string") {
        res.status(400);
        throw new Error("Descrição deve ser do tipo string");
      }
    }

    if (email) {
      if (typeof email !== "string") {
        res.status(400);
        throw new Error("Novo email deve ser de tipo string");
      }
    }

    if (password) {
      if (typeof password == "string") {
        throw new Error("'new password ' deve ser uma string");
      }
    }
    if (password) {
      // o método de string .match() verifica se existe o padrão,
      // caso exista ele retorna um array com os valores encontrados
      // caso não exista ele retorna null (por isso o !)
      if (
        !password.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g
        )
      ) {
        throw new Error(
          "'new password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial"
        );
      }
    }

    const userDatabase = new UserDatabase()

  
    const dbs4Edit:IUserDB[]|undefined[] = await userDatabase.findUserById(id)

    const db4Edit : IUserDB = dbs4Edit[0]
    const userPreUpdate: IUserDB = {
      id: cpfCnpj || db4Edit.id,
      name: name|| db4Edit.name,
      nickname: nickname|| db4Edit.nickname,
      email: email || db4Edit.email,
      password: password||db4Edit.password,
      created_at: db4Edit.created_at,
      avatar_img: avatar || db4Edit.avatar_img,
      role: role || db4Edit.role
    }


    const newUser: User = new User(
      userPreUpdate.id,
      userPreUpdate.name,
      userPreUpdate.nickname,
      userPreUpdate.email,
      userPreUpdate.password,
      userPreUpdate.created_at,
      userPreUpdate.avatar_img,
      userPreUpdate.role
    );

  const user4Update: IUserDB = {
    id: newUser.getId(),
    name: newUser.getName(),
    nickname: newUser.getNickname(),
    email: newUser.getEmail(),
    password: newUser.getPassword(),
    created_at: newUser.getCreatedAt(),
    avatar_img: newUser.getAvatar(),
    role: newUser.getRole()
  }

    await userDatabase.updateUser(user4Update, id)
    const usersDB:IUserDB[]|undefined[] = await userDatabase.findUserById(id)


    const result: User[] = usersDB.map(
      (userDB:IUserDB) =>
            new User(
              userDB.id,
              userDB.name,
              userDB.nickname,
              userDB.password,
              userDB.email,
              userDB.created_at,
              userDB.avatar_img,
              userDB.role
            )
    );
    


    res.status(200).json({ message: "user atualizado com sucesso", result });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
};

export const destroyUser = async (req: Request, res: Response) => {
  try {
    const id4Delete = req.params.id
    const userDatabase = new UserDatabase()

  
    const user: IUserDB[]|undefined[] = await userDatabase.findUserById(id4Delete)

    if (!user[0]) {
      throw new Error("usuário  nao encontrado");
    }

    
    await userDatabase.destroyUser(id4Delete)

    res.status(200).json({ message: "users deletado com sucesso" });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
};
*/