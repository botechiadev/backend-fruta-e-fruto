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
class UsersController {
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = req.query.q;
                const userDatabase = new UserDatabase_1.UserDatabase();
                const [usersData] = yield userDatabase.findUsers(q);
                const userFirst = [usersData][0];
                if (!usersData) {
                    res.status(404);
                    throw new Error("User not found");
                }
                else {
                    const result = usersData;
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
                    const result = usersDB;
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
                const result = {
                    id: Math.random().toString()
                };
                res.status(201).json({ message: "User created successfully", result });
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