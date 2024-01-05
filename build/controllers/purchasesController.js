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
const uuid_1 = require("uuid");
const Purchase_1 = require("../models/Purchase");
const Sale_1 = require("../models/Sale");
const helpers_1 = require("../helpers/helpers");
const PurchaseDatabase_1 = require("../database/PurchaseDatabase");
const User_1 = require("../models/User");
const AccountsDatabase_1 = require("../database/AccountsDatabase");
const UserWithAccount_1 = require("../models/UserWithAccount");
const interfaces_1 = require("./../interfaces/interfaces");
const UserDatabase_1 = require("./../database/UserDatabase");
const SalesDatabase_1 = require("./../database/SalesDatabase");
class PurchasesController {
    constructor() {
        this.createPurchase = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { total, productsList, buyerId } = req.body;
                const cartTotal = Number(total);
                const purchaseId = (0, uuid_1.v4)();
                const purchaseInstance = new Purchase_1.Purchase(purchaseId, buyerId, cartTotal, helpers_1.today);
                const purchaseDatabase = new PurchaseDatabase_1.PurchaseDatabase();
                const purchase4Insert = {
                    id: purchaseInstance.getId(),
                    buyer_id: buyerId,
                    finalPrice: purchaseInstance.getTFinalPrice(),
                    created_at: purchaseInstance.getCreatedAt()
                };
                yield purchaseDatabase.insertPurchase(purchase4Insert);
                const salesDatabase = new SalesDatabase_1.SalesDatabase();
                for (const item of productsList) {
                    const saleId = (0, uuid_1.v4)();
                    const newSale = new Sale_1.Sale(saleId, purchaseInstance.getId(), item.id, item.price, item.quantity, item.totalPrice);
                    if (newSale) {
                        const newSaleDB = {
                            id: newSale.getId(),
                            idPurchase: newSale.getPurchaseId(),
                            item: newSale.getItemId(),
                            price: Number(newSale.getItemPrice()),
                            quantity: Number(newSale.getItemQuantity()),
                            totalPrice: Number(newSale.getItemTotalPrice())
                        };
                        try {
                            yield salesDatabase.insertSale(newSaleDB);
                        }
                        catch (error) {
                            res.status(400).json({ error: "Erro ao cadastrar item em base de dados" });
                            return;
                        }
                    }
                    else {
                        res.status(400).json({ error: "Erro ao cadastrar item em base de dados" });
                        return;
                    }
                }
                const role = buyerId && total > 0 ? 'Cliente' : buyerId ? 'Cadastrado' : 'Anonimo';
                const userDatabase = new UserDatabase_1.UserDatabase();
                const client4Update = yield userDatabase.findUserById(buyerId);
                const instanceClient = new User_1.User(client4Update[0].id, client4Update[0].idProfile, client4Update[0].fullName, client4Update[0].nickname, client4Update[0].password, client4Update[0].email, client4Update[0].avatar, interfaces_1.USER_ROLES.Cliente, client4Update[0].createdAt);
                const user4UpdateDB = {
                    id: instanceClient.getId(),
                    idProfile: instanceClient.getIdProfile(),
                    fullName: instanceClient.getFullName(),
                    nickname: instanceClient.getNickname(),
                    password: instanceClient.getPassword(),
                    email: instanceClient.getEmail(),
                    avatar: instanceClient.getAvatar(),
                    role: instanceClient.getRole(),
                    createdAt: instanceClient.getCreatedAt()
                };
                yield userDatabase.updateUser(user4UpdateDB, instanceClient.getId());
                const id4ADB = user4UpdateDB.idProfile;
                const accountsDatabase = new AccountsDatabase_1.AccountsDatabase();
                const accountFromDB = yield accountsDatabase.findAccountById(id4ADB);
                const currentScore = Number(cartTotal * 0.3);
                const score4Update = Number(accountFromDB[0].score) + Number(currentScore);
                const currentBalance = Number(accountFromDB[0].balance);
                const defineAccountCategory = (score4Update) => {
                    if (score4Update < 100) {
                        return 'blue';
                    }
                    else if (score4Update >= 100 && score4Update <= 1000) {
                        return 'gold';
                    }
                    else {
                        return 'black';
                    }
                };
                const instance4Account = new UserWithAccount_1.UserWithAccount(instanceClient.getId(), instanceClient.getIdProfile(), instanceClient.getFullName(), instanceClient.getNickname(), instanceClient.getPassword(), instanceClient.getEmail(), instanceClient.getAvatar(), instanceClient.getRole(), instanceClient.getCreatedAt(), score4Update, currentBalance, helpers_1.today, defineAccountCategory(score4Update));
                const account4Update = {
                    id: instance4Account.getIdProfile(),
                    user_id: buyerId,
                    balance: instance4Account.getBalance(),
                    score: instance4Account.getScore(),
                    category: instance4Account.getCategory()
                };
                const buyerIdAccount = instance4Account.getIdProfile();
                yield accountsDatabase.updateAccount(account4Update, buyerIdAccount);
                if (buyerId === "000.000.000-00") {
                    res.status(201).json("201: Compra ANONIMA cadastrada com sucesso");
                }
                else {
                    const userDBResult = yield userDatabase.findUserById(buyerId);
                    const accountDBResult = yield accountsDatabase.findAccountById(account4Update.id);
                    const purchaseDBResult = yield purchaseDatabase.findPurchaseById(purchase4Insert.id);
                    const productsPurchased = yield salesDatabase.findSalesByPurchase(purchase4Insert.id);
                    const result = {
                        id: purchaseDBResult[0].id,
                        buyerId: userDBResult[0].nickname,
                        accountId: accountDBResult[0].id,
                        updatedScore: accountDBResult[0].score,
                        updatedCategory: accountDBResult[0].category,
                        purchasePrice: cartTotal,
                        purchaseList: productsPurchased
                    };
                    res.status(201).json({ message: 'Compra Cadastrada com sucesso', result });
                }
            }
            catch (error) {
                console.log(error);
                if (req.statusCode === 200) {
                    res.status(500);
                }
                if (error instanceof Error) {
                    res.send(error.message);
                }
                else {
                    res.send("Erro inesperado");
                }
            }
        });
        this.getAllPurchases = ((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const purchaseDatabase = new PurchaseDatabase_1.PurchaseDatabase();
                const purchaseDB = yield purchaseDatabase.findPurchases();
                if (!purchaseDB[0]) {
                    res.status(404);
                    throw new Error("404: Nenhum pagamento cadastrado");
                }
                const result = purchaseDB.map((purchase) => {
                    return new Purchase_1.Purchase(purchase.id, purchase.buyer_id, Number(purchase.finalPrice), purchase.created_at);
                });
                res.send({ message: "Lista de pagamentos Cadastrados", result });
            }
            catch (error) {
                console.log(error);
                if (req.statusCode === 200) {
                    res.status(500);
                }
                if (error instanceof Error) {
                    res.send(error.message);
                }
                else {
                    res.send("Erro inesperado");
                }
            }
        }));
        this.getPurchaseById = ((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const purchaseDatabase = new PurchaseDatabase_1.PurchaseDatabase();
                if (id === "000.000.000-00") {
                    const purchasesDB = yield purchaseDatabase.findPurchaseByBuyerId(id);
                    const result = purchasesDB.map((purchase) => {
                        return new Purchase_1.Purchase(purchase.id, purchase.buyer_id, Number(purchase.finalPrice), purchase.created_at);
                    });
                    res.status(200).json({ message: "Lista de pagamentos sem Usuario Cadastrado", result });
                }
                else {
                    const purchasesDB = yield purchaseDatabase.findPurchaseByBuyerId(id);
                    if (!purchasesDB[0]) {
                        res.status(404);
                        throw new Error("'404': Nenhum pagamento cadastrado ou usuario nao cadastrado");
                    }
                    const result = purchasesDB.map((purchase) => {
                        return new Purchase_1.Purchase(purchase.id, purchase.buyer_id, Number(purchase.finalPrice), purchase.created_at);
                    });
                    res.send({ message: `Lista de pagamentos Cadastrados com id ${id}`, result });
                }
            }
            catch (error) {
                console.log(error);
                if (req.statusCode === 200) {
                    res.status(500);
                }
                if (error instanceof Error) {
                    res.send(error.message);
                }
                else {
                    res.send("Erro inesperado");
                }
            }
        }));
        this.updatePurchase = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                res.status(200).json(`update purchase ${id}`);
            }
            catch (error) {
                console.log(error);
                if (req.statusCode === 200) {
                    res.status(500);
                }
                if (error instanceof Error) {
                    res.send(error.message);
                }
                else {
                    res.send("Erro inesperado");
                }
            }
        });
        this.destroyPurchase = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                res.status(200).json(`produto com id ${id} deletado com sucesso`);
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