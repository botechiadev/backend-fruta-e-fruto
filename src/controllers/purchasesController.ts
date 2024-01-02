import { Request, Response } from "express";
import { PurchaseItem } from "../models/PurchaseItem";
import { v4 as uuidv4 } from 'uuid';
import { PurchaseDetails } from "../models/PurchaseDetails";
export class PurchasesController {
    public getAllPurchases = async (req: Request, res: Response): Promise<void> => {
        try {

        


            const {total, products, client} = req.body
            const cartTotal = Number(total)
            let buyerRole = client as any
            

            // instancia nova classe sem valores de compra 

            export class PurchaseDetails {
                // Propriedades da classe
                private readonly id: string;
                private purchaseList: PurchaseItem[] = [];
                private totalPrice: number = 0;
                private percentOfDiscount: number = 0;
                private totalDiscount: number = 0;
                private finalPrice: number = 0;
                private totalItems: number = 0;
                private paymentType: PAYMENT_TYPES;
                private buyerId?: string | undefined;
                private accountId?: string | undefined;
            
                // Construtor da classe
                constructor(
                    id: string,
                    purchaseList: PurchaseItem[] = [],
                    paymentType: PAYMENT_TYPES,
                    buyerId?: string | undefined,
                    accountId?: string | undefined


            const purchaseDetails= new PurchaseDetails(
                uuidv4(),
                products,
                
            )

            // define novo role para cliente da compra
            if(!buyerRole || buyerRole === ""){
                buyerRole = "Anonimo"
                return buyerRole
            }else{
                buyerRole = "Cliente"
                return buyerRole
            }







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
