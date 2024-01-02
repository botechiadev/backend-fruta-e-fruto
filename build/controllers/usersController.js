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
const UserDatabase_1 = require("../database/UserDatabase");
const User_1 = require("../models/User");
const helpers_1 = require("../helpers/helpers");
const uuid_1 = require("uuid");
const UserWithAccount_1 = require("../models/UserWithAccount");
const AccountsDatabase_1 = require("../database/AccountsDatabase");
class UsersController {
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = req.query.q;
                const userDatabase = new UserDatabase_1.UserDatabase();
                const usersData = yield userDatabase.findUsers(q);
                if (!usersData[0]) {
                    res.status(404);
                    throw new Error("User not found");
                }
                else {
                    const result = usersData.map((user) => {
                        return new User_1.User(user.id, user.idProfile, user.fullName, user.nickname, user.password, user.email, user.avatar, user.role, user.createdAt);
                    });
                    res.status(200).json({ message: "User result", result });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).send(error instanceof Error ? error.message : "Unexpected error");
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const userDatabase = new UserDatabase_1.UserDatabase();
                const usersDB = yield userDatabase.findUserById(id);
                const userFirst = usersDB[0];
                if (!userFirst) {
                    res.status(404).json({ message: "User not found" });
                }
                else {
                    const result = new User_1.User(userFirst.id, userFirst.id, userFirst.fullName, userFirst.nickname, userFirst.password, userFirst.email, userFirst.avatar, userFirst.role, userFirst.createdAt);
                    res.status(200).json({ message: "User found", result });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).send(error instanceof Error ? error.message : "Unexpected error");
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, fullName, nickname, email, password, avatar, role } = req.body;
                const newAccount = (0, uuid_1.v4)();
                const newInstanceUser = new UserWithAccount_1.UserWithAccount(id, newAccount, fullName, nickname, password, email, avatar, role, helpers_1.today, 0, 0, helpers_1.today, 'blue');
                const objUser = {
                    id: newInstanceUser.getId(),
                    idProfile: newInstanceUser.getIdProfile(),
                    fullName: newInstanceUser.getFullName(),
                    nickname: newInstanceUser.getNickname(),
                    password: newInstanceUser.getPassword(),
                    email: newInstanceUser.getEmail(),
                    avatar: newInstanceUser.getAvatar(),
                    role: newInstanceUser.getRole(),
                    createdAt: newInstanceUser.getCreatedAt()
                };
                const userDatabase = new UserDatabase_1.UserDatabase();
                yield userDatabase.insertUser(objUser);
                const objAccount = {
                    id: newInstanceUser.getIdProfile(),
                    user_id: newInstanceUser.getId(),
                    balance: newInstanceUser.getBalance(),
                    score: newInstanceUser.getScore(),
                    category: newInstanceUser.getCategory()
                };
                const accountsDatabase = new AccountsDatabase_1.AccountsDatabase();
                yield accountsDatabase.insertAccount(objAccount);
                res.status(201).json({ message: "Usuario criado com sucesso" });
            }
            catch (error) {
                console.error(error);
                res.status(500).send(error instanceof Error ? error.message : "Unexpected error");
            }
        });
    }
    editUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = {
                    id: Math.random().toString()
                };
                res.status(200).json({ message: "User updated successfully", result });
            }
            catch (error) {
                console.error(error);
                res.status(500).send(error instanceof Error ? error.message : "Unexpected error");
            }
        });
    }
    destroyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({ message: "User deleted successfully" });
            }
            catch (error) {
                console.error(error);
                res.status(500).send(error instanceof Error ? error.message : "Unexpected error");
            }
        });
    }
}
exports.default = UsersController;
//# sourceMappingURL=usersController.js.map