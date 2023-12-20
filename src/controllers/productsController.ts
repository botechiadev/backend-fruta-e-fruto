import { Request,  Response } from "express"
import { Product } from "../models/Product";
import { IProductDB } from "../interfaces/interfaces"
import { v4 as uuidv4 } from 'uuid';
const productsController = {
    getAllProducts : async (req: Request, res:Response) => {
        res.status(200)
        res.json(`endpoints products`)
    }
,
    getProductById : async (req: Request, res:Response) => {
        const id= req.params.id as string
        res.status(201)
        res.json(`endpoints product ${id}`)
    }
    ,
    createProduct : async (req: Request, res:Response) => {
        
        const { inputName: name, inputDescription: description, inputPrice: price, inputImageUrl: imageUrl, category} = req.body

        const newInstance = new Product(
            uuidv4(),
            name,
            description,
            imageUrl,
            price,
            category
        )

        const instance4InsertDB : IProductDB ={
            id: newInstance.getId(),
            name: newInstance.getName(),
            description: newInstance.getDescription(),
            imageUrl: newInstance.getImageUrl(),
            price: newInstance.getPrice(),
            category: newInstance.getCategory()
        }

        // await db.insertInstance(instance4InsertDB)
        // instanceSuccess = await db.insertInstance(instance)

        const result:IProductDB = instance4InsertDB

        res.status(200)
        res.json({message: `produto insertado e instanciado`, result} )
    }
,
    updateProduct : async (req: Request, res:Response) => {
        const id= req.params.id as string
        res.status(200)
        res.json(`endpoints product ${id}`)
    }


}