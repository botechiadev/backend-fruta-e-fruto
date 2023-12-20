"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, fullName, nickname, password, email, createdAt, avatar, role) {
        this.id = id;
        this.fullName = fullName;
        this.nickname = "@" + nickname.toLowerCase();
        this.password = password;
        this.email = email;
        this.createdAt = createdAt;
        this.avatar = avatar;
        this.role = role;
    }
    getId() {
        return this.id;
    }
    getFullName() {
        return this.fullName;
    }
    getNickname() {
        return this.nickname;
    }
    setNickname(newNickname) {
        this.nickname = newNickname;
    }
    getEmail() {
        return this.email;
    }
    setEmail(newEmail) {
        this.email = newEmail;
    }
    getPassword() {
        return this.password;
    }
    setPassword(newPassword) {
        this.password = newPassword;
    }
    getAvatar() {
        return this.avatar;
    }
    setAvatar(value) {
        this.avatar = value;
    }
    getRole() {
        return this.role;
    }
    setRole(value) {
        this.role = value;
    }
    getCreatedAt() {
        return this.createdAt;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map