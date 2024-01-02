import { Product } from './../models/Product';
import { ProductsDatabase } from "./../database/ProductsDatabase";
import { Request, Response } from "express";
import { IProductDB } from "../interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";
import { resolveSoa } from 'dns';

export class ProductController {
  public getAllProducts = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const q = req.query.q as string | undefined;

      if ((q && q.length < 0) || q === "") {
        res.status(400);
        throw new Error("Pesquisa deve ter ao menos 1 caracter");
      }

      const productsDatabase = new ProductsDatabase();
      const productDB = await productsDatabase.findProducts(q);

      // error 404 para usuarios nao encontrados
      if (productDB.length === 0) {
        res.status(404);
        throw new Error("404 produto nao encontrado");
      } else {
        const result = productDB;

        res.status(200).send({ result });
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
  };
  public getProductById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const id = req.params.id as string;
      const productsDatabase = new ProductsDatabase();
      const productDB = await productsDatabase.findProductById(id);
      const result = productDB[0]
      res.status(200);
      res.json({result});
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

  public createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        item,
        description,
        price,
        imageUrl,
        category,
      } = req.body;
      const regex = /^(https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}([-a-zA-Z0-9@:%_\+.~#?&//=]*)?)$/;

      // Exemplo de uso
      if (!regex.test(imageUrl)) {
        res.status(400)
        throw new Error('"400" URL para imagem invalida')
      }

      if(description.length<1|| description.length>60 || description.length === ""){
        res.status(400)
        throw new Error('"400" Descricao para produto invalida')
      }


      if(price === 0 || typeof price != typeof Number){
        res.status(400)
        throw new Error('"400" Descricao para produto invalida')
      }

      if(item.length<1|| item.length>60 || item.length === ""){
        res.status(400)
        throw new Error('"400" Nome do Item para produto invalida')
      }

      const newInstance = new Product(
        uuidv4(),
        item,
        description,
        imageUrl,
        price,
        category
      );

      const instance4InsertDB: IProductDB = {
        id: newInstance.getId(),
        item: newInstance.getItem(),
        description: newInstance.getDescription(),
        image_url: newInstance.getImageUrl(),
        price: newInstance.getPrice(),
        category: newInstance.getCategory(),
      };

      const productsDatabase= new ProductsDatabase()
     await productsDatabase.insertProduct(instance4InsertDB)
     const [instanceSuccess] = await productsDatabase.findProductById(instance4InsertDB.id)

      const result = instanceSuccess;

      res.status(200);
      res.json({ message: `produto insertado e instanciado`, result });
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

  public updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      res.status(200);
      res.json(`update product ${id}`);
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  public destroyProduct = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const id = req.params.id as string;
      res.status(200);
      res.json(`produto com id ${id} deletado com sucesso`);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}

export default ProductController;
