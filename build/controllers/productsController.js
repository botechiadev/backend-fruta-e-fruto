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
const Product_1 = require("../models/Product");
const uuid_1 = require("uuid");
class ProductController {
    constructor() {
        this.getAllProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200);
                res.json(`endpoints products`);
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
        this.getProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                res.status(201);
                res.json(`endpoints product ${id}`);
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
        this.createProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { inputName: name, inputDescription: description, inputPrice: price, inputImageUrl: imageUrl, category } = req.body;
                const newInstance = new Product_1.Product((0, uuid_1.v4)(), name, description, imageUrl, price, category);
                const instance4InsertDB = {
                    id: newInstance.getId(),
                    name: newInstance.getName(),
                    description: newInstance.getDescription(),
                    imageUrl: newInstance.getImageUrl(),
                    price: newInstance.getPrice(),
                    category: newInstance.getCategory()
                };
                const result = instance4InsertDB;
                res.status(200);
                res.json({ message: `produto insertado e instanciado`, result });
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
        this.updateProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                res.status(200);
                res.json(`update product ${id}`);
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
        this.destroyProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
exports.ProductController = ProductController;
exports.default = ProductController;
//# sourceMappingURL=productsController.js.map