"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PurchaseTicket {
    constructor(id, purchaseDetailsTicket, createdAt) {
        this.id = id;
        this.purchaseDetailsTicket = purchaseDetailsTicket;
        this.createdAt = createdAt;
    }
    getId() {
        return this.id;
    }
    getPurchaseDetailsTicket() {
        return this.purchaseDetailsTicket;
    }
    getCreatedAt() {
        return this.createdAt;
    }
}
//# sourceMappingURL=PurchaseTicket.js.map