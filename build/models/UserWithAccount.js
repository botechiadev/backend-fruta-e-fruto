"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWithAccount = void 0;
const User_1 = require("./User");
class UserWithAccount extends User_1.User {
    constructor(id, idProfile, fullName, nickname, email, password, avatar, role, createdAt, score, balance, updatedAt, category) {
        super(id, idProfile, fullName, nickname, email, password, avatar, role, createdAt);
        this.score = score;
        this.balance = balance;
        this.updatedAt = updatedAt;
        this.category = category;
    }
    getScore() {
        return this.score;
    }
    getBalance() {
        return this.balance;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    getCategory() {
        return this.category;
    }
    addPoints(value) {
        const shoppingPointsEarned = value * 0.5;
        this.score += shoppingPointsEarned;
    }
    makePurchase(amount) {
        if (this.balance - amount < 0) {
            throw new Error('Saldo insuficiente.');
        }
        this.balance -= amount;
        this.score += amount * 2;
    }
    redeemPointsForPrize(prizePoints) {
        if (this.score >= prizePoints) {
            this.score -= prizePoints;
            console.log(`Prêmio resgatado com sucesso! Pontuação restante: ${this.score}`);
        }
        else {
            throw new Error('Pontuação insuficiente para resgatar o prêmio.');
        }
    }
    defineCategory(score) {
        if (this.score < 100) {
            this.category = 'blue';
        }
        else if (this.score >= 100 && this.score <= 1000) {
            this.category = 'gold';
        }
        else {
            this.category = 'black';
        }
    }
}
exports.UserWithAccount = UserWithAccount;
//# sourceMappingURL=UserWithAccount.js.map