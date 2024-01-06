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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const UserDatabase_1 = require("../database/UserDatabase");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class SignInController {
    postAuth(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nickname, password } = req.body;
                const userDatabase = new UserDatabase_1.UserDatabase();
                const [usersData] = yield userDatabase.findUserByNickname(nickname);
                const userFirst = [usersData][0];
                if (!usersData) {
                    res.status(401);
                    throw new Error("401 nickname INVALIDO");
                }
                else {
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
            }
            catch (error) {
                console.error(error);
                res.status(500).send(error instanceof Error ? error.message : "Unexpected error");
            }
        });
    }
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = req.user;
                res.status(200).json({ message: "Usuario Autorizado", result });
            }
            catch (error) {
                console.error(error);
                res.status(500).send(error instanceof Error ? error.message : "Unexpected error");
            }
        });
    }
}
exports.default = SignInController;
//# sourceMappingURL=signInController.js.map