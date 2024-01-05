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
exports.AccountsDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class AccountsDatabase extends BaseDatabase_1.BaseDatabase {
    findAccounts(q) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!q) {
                const result = yield BaseDatabase_1.BaseDatabase.connection(AccountsDatabase.TABLE_ACCOUNTS);
                const accountsDB = result;
                return accountsDB;
            }
            else {
                const result = yield BaseDatabase_1.BaseDatabase.connection(AccountsDatabase.TABLE_ACCOUNTS).
                    where("item", "LIKE", `%${q}%`);
                const accountsDB = result;
                return accountsDB;
            }
        });
    }
    findAccountById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(AccountsDatabase.TABLE_ACCOUNTS).where("id", "LIKE", `%${id}%`);
            const ProductsDB = result;
            return ProductsDB;
        });
    }
    findAccountId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection.
                raw(`SELECT id FROM ${AccountsDatabase.TABLE_ACCOUNTS} WHERE id LIKE "%${id}%"`);
            const accountId = result;
            return accountId;
        });
    }
    findProductEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection.
                raw(`SELECT email FROM ${AccountsDatabase.TABLE_ACCOUNTS} WHERE email LIKE ${email}`);
            const ProductEmail = result;
            return ProductEmail;
        });
    }
    findProductNickname(nickname) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection.
                raw(`SELECT nickname FROM ${AccountsDatabase.TABLE_ACCOUNTS} WHERE nickname LIKE ${nickname}`);
            const ProductNickname = result;
            return ProductNickname;
        });
    }
    insertAccount(Account4Insert) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(AccountsDatabase.TABLE_ACCOUNTS).insert(Account4Insert);
        });
    }
    updateAccount(Account4Update, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(AccountsDatabase.TABLE_ACCOUNTS).
                update(Account4Update).
                where({ id: `${id}` });
        });
    }
    destroyProduct(idToDelete) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(AccountsDatabase.TABLE_ACCOUNTS).
                delete().where({ id: idToDelete });
        });
    }
}
exports.AccountsDatabase = AccountsDatabase;
AccountsDatabase.TABLE_ACCOUNTS = "accounts";
//# sourceMappingURL=AccountsDatabase.js.map