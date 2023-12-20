import { Request, Response } from "express";
import { PurchaseItem } from "../models/PurchaseItem";
import { v4 as uuidv4 } from 'uuid';

export class PurchasesController {
    public getAllPurchases = async (req: Request, res: Response): Promise<void> => {
        try {
            res.status(200);
            res.json(`endpoints purchases`);
        } catch (error) {
            res.status(500).json({ error});
        }
    };

    public getPurchaseById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id as string;
            res.status(201);
            res.json(`endpoints purchase ${id}`);
        } catch (error) {
            res.status(500).json({ error});
        }
    };

    public createPurchase = async (req: Request, res: Response): Promise<void> => {
        try {

const result = {id: Math.random().toString() }

            res.status(200);
            res.json({ message: `produto insertado e instanciado`, result });
        } catch (error) {
            res.status(500).json({ error});
        }
    };

    public updatePurchase = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id as string;
            res.status(200);
            res.json(`update purchase ${id}`);
        } catch (error) {
            res.status(500).json({ error});
        }
    };

    public destroyPurchase = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id as string;
            res.status(200);
            res.json(`produto com id ${id} deletado com sucesso`);
        } catch (error) {
            res.status(500).json({ error});
        }
    };
}

export default PurchasesController;
