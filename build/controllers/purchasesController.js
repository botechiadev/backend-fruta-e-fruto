"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasesController = void 0;
class PurchasesController {
    constructor() {
        this.getAllPurchases = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { total, products, client } = req.body;
                const cartTotal = Number(total);
                let buyerRole = client;
                if (!buyerRole || buyerRole === "") {
                    buyerRole = "Anonimo";
                    return buyerRole;
                }
                else {
                    buyerRole = "Client";
                    return buyerRole;
                }
                res.status(200);
                res.json(`endpoints purchases`);
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
        this.getPurchaseById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                res.status(201);
                res.json(`endpoints purchase ${id}`);
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
        this.createPurchase = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = { id: Math.random().toString() };
                res.status(200);
                res.json({ message: `produto insertado e instanciado`, result });
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
        this.updatePurchase = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                res.status(200);
                res.json(`update purchase ${id}`);
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
        this.destroyPurchase = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                res.status(200);
                res.json(`produto com id ${id} deletado com sucesso`);
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
    }
}
exports.PurchasesController = PurchasesController;
exports.default = PurchasesController;
//# sourceMappingURL=purchasesController.js.map