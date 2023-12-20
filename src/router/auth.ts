import { Router, Request, Response } from "express";
const router: Router = Router();



router.get('/', (req:Request, res:Response)=>{
    res.send('HELLO WORD')
})

export default Router;