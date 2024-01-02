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
exports.UserDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    findUsers(q) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!q) {
                const result = yield BaseDatabase_1.BaseDatabase.connection(UserDatabase.TABLE_USERS);
                const usersDB = result;
                return usersDB;
            }
            else {
                const result = yield BaseDatabase_1.BaseDatabase.connection(UserDatabase.TABLE_USERS).
                    where("nickname", "LIKE", `%${q}%`);
                const usersDB = result;
                return usersDB;
            }
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(UserDatabase.TABLE_USERS).
                where("id", "LIKE", `%${id}%`);
            const usersDB = result;
            return usersDB;
        });
    }
    findUserByNicknames(nickname, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(UserDatabase.TABLE_USERS).
                where("nickname", "LIKE", `%${nickname}%`).
                andWhere(password = `${password}`);
            if (result) {
                return "bananinha";
            }
            else {
                return "cajuzinho";
            }
        });
    }
    findUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection.
                raw(`SELECT id FROM ${UserDatabase.TABLE_USERS} WHERE id LIKE ${id}`);
            const userId = result;
            return userId;
        });
    }
    findUserEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection.
                raw(`SELECT email FROM ${UserDatabase.TABLE_USERS} WHERE email LIKE ${email}`);
            const userEmail = result;
            return userEmail;
        });
    }
    findUserNickname(nickname) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection.
                raw(`SELECT nickname FROM ${UserDatabase.TABLE_USERS} WHERE nickname LIKE ${nickname}`);
            const userNickname = result;
            return userNickname;
        });
    }
    insertUser(user4Insert) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(user4Insert);
        });
    }
    updateUser(user4Update, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(UserDatabase.TABLE_USERS).
                update(user4Update).
                where({ id: `${id}` });
        });
    }
    destroyUser(idToDelete) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(UserDatabase.TABLE_USERS).
                delete().where({ id: idToDelete });
        });
    }
}
exports.UserDatabase = UserDatabase;
UserDatabase.TABLE_USERS = "users";
//# sourceMappingURL=UserDatabase.js.map