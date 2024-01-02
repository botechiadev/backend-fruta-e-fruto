"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, idProfile, fullName, nickname, password, email, avatar, role, createdAt) {
        this.id = id;
        this.idProfile = idProfile;
        this.fullName = fullName.toUpperCase();
        this.nickname = nickname.toLowerCase();
        this.password = password;
        this.email = email;
        this.avatar = avatar;
        this.role = role;
        this.createdAt = createdAt;
    }
    getId() {
        return this.id;
    }
    getIdProfile() {
        return this.idProfile;
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
    getAll() {
        this.getId(),
            this.getIdProfile(),
            this.getFullName(),
            this.getNickname(),
            this.getPassword(),
            this.getEmail(),
            this.getPassword(),
            this.getAvatar(),
            this.getRole(),
            this.getPassword();
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map