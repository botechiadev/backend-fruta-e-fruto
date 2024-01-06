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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserDatabase_1 = require("../database/UserDatabase");
const User_1 = require("../models/User");
const helpers_1 = require("../helpers/helpers");
const uuid_1 = require("uuid");
const UserWithAccount_1 = require("../models/UserWithAccount");
const AccountsDatabase_1 = require("../database/AccountsDatabase");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
                    res.status(404);
                    throw new Error("User not found");
                }
                else {
                    const result = usersDB.map((user) => {
                        return new User_1.User(user.id, user.idProfile, user.fullName, user.nickname, user.password, user.email, user.avatar, user.role, user.createdAt);
                    });
                    res.status(200).json({ message: "Usuario encontrado", result });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).send(error instanceof Error ? error.message : "Unexpected error");
            }
        });
    }
    getUserByNickname(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nickname = req.params.nickname;
                const userDatabase = new UserDatabase_1.UserDatabase();
                const usersDB = yield userDatabase.findUserByNickname(nickname);
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
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, fullName, nickname, email, password, avatar, role } = req.body;
                const newAccount = (0, uuid_1.v4)();
                const passwordHash = yield bcrypt_1.default.hash(password, 10);
                const newInstanceUser = new UserWithAccount_1.UserWithAccount(id, newAccount, fullName, nickname, passwordHash, email, avatar, role, helpers_1.today, 0, 0, helpers_1.today, 'blue');
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
                const [usersData] = yield userDatabase.findUserByNickname(objUser.nickname);
                const dataHash = usersData;
                const confirmHash = yield bcrypt_1.default.compare(password, dataHash.password);
                if (!confirmHash) {
                    res.status(401);
                    throw new Error('"401" : Senha invalida');
                }
                const token = jsonwebtoken_1.default.sign({
                    id: dataHash.id
                }, (_a = process.env.JWT_KEY) !== null && _a !== void 0 ? _a : "", {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                const user = dataHash;
                const { password: _ } = user, userLogin = __rest(user, ["password"]);
                res.status(200).json({ message: "User result",
                    token,
                    user: userLogin
                });
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
                const id = req.params.id;
                const { nickname, email, password, avatar, role } = req.body;
                const usersDatabase = new UserDatabase_1.UserDatabase();
                const userExist = yield usersDatabase.findUserId(id);
                if (!userExist) {
                    res.status(404);
                    throw new Error('"404": Usuario Nao Cadastrado');
                }
                const user4Edit = yield usersDatabase.findUserById(id);
                const inst4Edit = new User_1.User(user4Edit[0].id, user4Edit[0].idProfile, user4Edit[0].fullName, user4Edit[0].nickname, user4Edit[0].password, user4Edit[0].email, user4Edit[0].avatar, user4Edit[0].role, user4Edit[0].createdAt);
                nickname !== inst4Edit.getNickname() ? inst4Edit.setNickname(nickname) : inst4Edit.getNickname();
                password !== inst4Edit.getPassword() ? inst4Edit.setPassword(password) : inst4Edit.getPassword();
                email !== inst4Edit.getEmail() ? inst4Edit.setEmail(email) : inst4Edit.getEmail();
                avatar !== inst4Edit.getAvatar() ? inst4Edit.setEmail(email) : inst4Edit.getEmail();
                const obj4Update = {
                    id,
                    idProfile: inst4Edit.getIdProfile(),
                    fullName: inst4Edit.getFullName(),
                    nickname: inst4Edit.getNickname(),
                    email: inst4Edit.getEmail(),
                    password: inst4Edit.getPassword(),
                    avatar: inst4Edit.getAvatar(),
                    role: inst4Edit.getRole(),
                    createdAt: inst4Edit.getCreatedAt()
                };
                yield usersDatabase.updateUser(obj4Update, id);
                const usersData = yield usersDatabase.findUserById(id);
                if (!usersData[0]) {
                    res.status(400);
                    throw new Error("Cadastro nao completado");
                }
                else {
                    const user = usersData[0];
                    const result = new User_1.User(user.id, user.idProfile, user.fullName, user.nickname, user.password, user.email, user.avatar, user.role, user.createdAt);
                    res.status(200).json({ message: "User updated successfully", result });
                }
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