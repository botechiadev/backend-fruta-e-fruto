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
exports.ProductsDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class ProductsDatabase extends BaseDatabase_1.BaseDatabase {
    findProducts(q) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!q) {
                const result = yield BaseDatabase_1.BaseDatabase.connection(ProductsDatabase.TABLE_PRODUCTS);
                const productsDB = result;
                return productsDB;
            }
            else {
                const result = yield BaseDatabase_1.BaseDatabase.connection(ProductsDatabase.TABLE_PRODUCTS).
                    where("item", "LIKE", `%${q}%`);
                const productsDB = result;
                return productsDB;
            }
        });
    }
    findProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(ProductsDatabase.TABLE_PRODUCTS).
                where("id", "LIKE", `%${id}%`);
            const ProductsDB = result;
            return ProductsDB;
        });
    }
    findProductId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection.
                raw(`SELECT id FROM ${ProductsDatabase.TABLE_PRODUCTS} WHERE id LIKE ${id}`);
            const ProductId = result;
            return ProductId;
        });
    }
    findProductEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection.
                raw(`SELECT email FROM ${ProductsDatabase.TABLE_PRODUCTS} WHERE email LIKE ${email}`);
            const ProductEmail = result;
            return ProductEmail;
        });
    }
    findProductNickname(nickname) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection.
                raw(`SELECT nickname FROM ${ProductsDatabase.TABLE_PRODUCTS} WHERE nickname LIKE ${nickname}`);
            const ProductNickname = result;
            return ProductNickname;
        });
    }
    insertProduct(Product4Insert) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(ProductsDatabase.TABLE_PRODUCTS).insert(Product4Insert);
        });
    }
    updateProduct(Product4Update, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(ProductsDatabase.TABLE_PRODUCTS).
                update(Product4Update).
                where({ id: `${id}` });
        });
    }
    destroyProduct(idToDelete) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(ProductsDatabase.TABLE_PRODUCTS).
                delete().where({ id: idToDelete });
        });
    }
}
exports.ProductsDatabase = ProductsDatabase;
ProductsDatabase.TABLE_PRODUCTS = "products";
//# sourceMappingURL=ProductsDatabase.js.map