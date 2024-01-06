import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { UserDatabase } from '../database/UserDatabase';
import { IUserDB } from '../interfaces/interfaces';
import { today } from '../helpers/helpers';
import uuidv4 from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();

class SignInController {
  async postAuth(req: Request, res: Response) {
    try {
      const { nickname, password } = req.body;
      const userDatabase = new UserDatabase();
      const [userData] = await userDatabase.findUserByNickname(nickname);

      if (!userData) {
        res.status(401).json({ error: '401 nickname INVALIDO' });
      } else {
        const isValidPassword = await bcrypt.compare(password, userData.password);

        if (!isValidPassword) {
          res.status(401).json({ error: '401 Senha invalida' });
        }

        const token = jwt.sign({ id: userData.id }, process.env.JWT_KEY ?? '', {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        const { password: _, ...userLogin } = userData;

        res.status(200).json({ message: 'User result', token, user: userLogin });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error instanceof Error ? error.message : 'Unexpected error');
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const result = req.user;
      res.status(200).json({ message: 'Usuario Autorizado', result });
    } catch (error) {
      console.error(error);
      res.status(500).send(error instanceof Error ? error.message : 'Unexpected error');
    }
  }
}

export default SignInController;