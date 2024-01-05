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
exports.ProductController = void 0;
const AccountsDatabase_1 = require("./../database/AccountsDatabase");
const Product_1 = require("./../models/Product");
const ProductsDatabase_1 = require("./../database/ProductsDatabase");
const uuid_1 = require("uuid");
class ProductController {
    constructor() {
        this.getAllProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = req.query.q;
                if ((q && q.length < 0) || q === "") {
                    res.status(400);
                    throw new Error("Pesquisa deve ter ao menos 1 caracter");
                }
                const productsDatabase = new ProductsDatabase_1.ProductsDatabase();
                const productDB = yield productsDatabase.findProducts(q);
                if (!productDB[0]) {
                    res.status(404);
                    throw new Error("404 produto nao encontrado");
                }
                else {
                    const result = productDB.map((product) => {
                        return new Product_1.Product(product.id, product.item, product.description, product.image_url, product.price, product.category);
                    });
                    res.status(200).send({ result });
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
        this.getProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const productsDatabase = new ProductsDatabase_1.ProductsDatabase();
                const productDB = yield productsDatabase.findProductById(id);
                const resultDB = productDB[0];
                if (!resultDB) {
                    res.status(404);
                    throw new Error(`"404" o produto com id : ${id} nao esta cadastrado`);
                }
                const result = new Product_1.Product(resultDB.id, resultDB.item, resultDB.description, resultDB.image_url, resultDB.price, resultDB.category);
                res.status(200);
                res.json({ result });
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
        this.createProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { item, description, price, imageUrl, category, } = req.body;
                const regex = /^(https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}([-a-zA-Z0-9@:%_\+.~#?&//=]*)?)$/;
                if (!regex.test(imageUrl)) {
                    res.status(400);
                    throw new Error('"400" URL para imagem invalida');
                }
                if (description.length < 1 || description.length > 60 || description.length === "") {
                    res.status(400);
                    throw new Error('"400" Descricao para produto invalida');
                }
                if (item.length < 1 || item.length > 60 || item.length === "") {
                    res.status(400);
                    throw new Error('"400" Nome do Item para produto invalida');
                }
                const newInstance = new Product_1.Product((0, uuid_1.v4)(), item, description, imageUrl, Number(price), category);
                const instance4InsertDB = {
                    id: newInstance.getId(),
                    item: newInstance.getItem(),
                    description: newInstance.getDescription(),
                    image_url: newInstance.getImageUrl(),
                    price: newInstance.getPrice(),
                    category: newInstance.getCategory(),
                };
                const productsDatabase = new ProductsDatabase_1.ProductsDatabase();
                yield productsDatabase.insertProduct(instance4InsertDB);
                const instanceSuccess = yield productsDatabase.findProductById(instance4InsertDB.id);
                const resultDB = instanceSuccess[0];
                if (!resultDB) {
                    res.status(400);
                    throw new Error("'400': Falha ao cadastrar produto ");
                }
                const result = new Product_1.Product(resultDB.id, resultDB.item, resultDB.description, resultDB.image_url, resultDB.price, resultDB.category);
                res.status(201);
                res.json({ message: `produto insertado e instanciado`, result });
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
        this.updateProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const { item, description, imageUrl, price, category } = req.body;
                const productsDatabase = new ProductsDatabase_1.ProductsDatabase();
                const productExists = yield productsDatabase.findProductById(id);
                const regex = /^(https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}([-a-zA-Z0-9@:%_\+.~#?&//=]*)?)$/;
                if (!regex.test(imageUrl)) {
                    res.status(400);
                    throw new Error('"400" URL para imagem invalida');
                }
                if (!productExists[0]) {
                    res.status(404);
                    throw new Error(`"404" Produto com ${id} não foi encontrado`);
                }
                const existingProduct = productExists[0];
                const updatedProduct = new Product_1.Product(existingProduct.id, existingProduct.item, existingProduct.description, existingProduct.image_url, existingProduct.price, existingProduct.category);
                if (description)
                    updatedProduct.setDescription(description);
                if (imageUrl)
                    updatedProduct.setImageUrl(imageUrl);
                if (price)
                    updatedProduct.setPrice(Number(price));
                if (category)
                    updatedProduct.setCategory(category);
                const updatedProductDB = {
                    id: updatedProduct.getId(),
                    item: updatedProduct.getItem(),
                    description: updatedProduct.getDescription(),
                    image_url: updatedProduct.getImageUrl(),
                    price: updatedProduct.getPrice(),
                    category: updatedProduct.getCategory(),
                };
                yield productsDatabase.updateProduct(updatedProductDB, id);
                res.status(200);
                res.json(`Produto ${id} atualizado com sucesso`);
            }
            catch (error) {
                res.status(500).json({ error: error });
            }
        });
        this.destroyProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const accountId = req.headers.Header;
                const productsDatabase = new ProductsDatabase_1.ProductsDatabase();
                const accountsDatabase = new AccountsDatabase_1.AccountsDatabase();
                yield accountsDatabase.destroyProduct(accountId);
                yield productsDatabase.destroyProduct(id);
                res.status(200);
                res.json(`produto com id ${id} deletado com sucesso`);
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
    }
}
exports.ProductController = ProductController;
exports.default = ProductController;
//# sourceMappingURL=productsController.js.map