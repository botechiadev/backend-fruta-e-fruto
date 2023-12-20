import { Request, Response } from "express";
import { Product } from "../models/Product";
import { IProductDB } from "../interfaces/interfaces";
import { v4 as uuidv4 } from 'uuid';

export class ProductController {
    public getAllProducts = async (req: Request, res: Response): Promise<void> => {
        try {
            res.status(200);
            res.json(`endpoints products`);
        } catch (error) {
            res.status(500).json({ error});
        }
    };

    public getProductById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id as string;
            res.status(201);
            res.json(`endpoints product ${id}`);
        } catch (error) {
            res.status(500).json({ error});
        }
    };

    public createProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const { inputName: name, inputDescription: description, inputPrice: price, inputImageUrl: imageUrl, category } = req.body;

            const newInstance = new Product(
                uuidv4(),
                name,
                description,
                imageUrl,
                price,
                category
            );

            const instance4InsertDB: IProductDB = {
                id: newInstance.getId(),
                name: newInstance.getName(),
                description: newInstance.getDescription(),
                imageUrl: newInstance.getImageUrl(),
                price: newInstance.getPrice(),
                category: newInstance.getCategory()
            };

            // await db.insertInstance(instance4InsertDB)
            // instanceSuccess = await db.insertInstance(instance)

            const result: IProductDB = instance4InsertDB;

            res.status(200);
            res.json({ message: `produto insertado e instanciado`, result });
        } catch (error) {
            res.status(500).json({ error});
        }
    };

    public updateProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id as string;
            res.status(200);
            res.json(`update product ${id}`);
        } catch (error) {
            res.status(500).json({ error});
        }
    };

    public destroyProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id as string;
            res.status(200);
            res.json(`produto com id ${id} deletado com sucesso`);
        } catch (error) {
            res.status(500).json({ error});
        }
    };
}

export default ProductController;
