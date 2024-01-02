import express, { Router } from "express";
import SignInController from "./../controllers/signInController";

class AuthRouter {
  private router: Router;
  private signInController: SignInController

  constructor() {
    this.router = express.Router();
    this.signInController = new SignInController();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.post("/", this.signInController.getUserByNickname);
  }

  getRouter() {
    return this.router;
  }
}

export default AuthRouter;
