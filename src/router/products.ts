import express,  { Router } from "express";


const router = express.Router()

router.get('/', async (req, res) => {
    res.status(200)
    res.json(`endpoints products`)
})


export default router