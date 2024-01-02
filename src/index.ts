import express , {Application, Request, Response} from 'express'



import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from 'path';

import RecipesRouter from './router/recipes';
import ProductsRouter from './router/products';
import PurchasesRouter from './router/purchases';
import UsersRouter from './router/users';
import AuthRouter from './router/auth';

const recipesRouter = new RecipesRouter();
const usersRouter = new UsersRouter();
const productsRouter = new ProductsRouter();
const purchasesRouter = new PurchasesRouter();
const authRouter = new AuthRouter();

const app : Application = express();


app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "./../public/")))
app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong");
});
app.use('/api/auth', authRouter.getRouter());
app.use('/api/recipes', recipesRouter.getRouter());
app.use('/api/products', productsRouter.getRouter());
app.use('/api/users', usersRouter.getRouter());
app.use('/api/purchases', purchasesRouter.getRouter());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


export default app