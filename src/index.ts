import express , {Application, Request, Response} from 'express'



import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from 'path';
import authRouter from './router/auth'

import RecipesRouter from './router/recipes';

const recipesRouter = new RecipesRouter();


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

app.use('/recipes', recipesRouter.getRouter());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


export default app