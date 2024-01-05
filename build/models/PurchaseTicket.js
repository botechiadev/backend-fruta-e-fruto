"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PurchaseTicket {
    constructor(id, ticketId, finalPrice, paid, createdAt) {
        this.id = id;
        this.ticketId = ticketId;
        this.finalPrice = finalPrice;
        this.paid = paid;
        this.createdAt = createdAt;
    }
    getId() {
        return this.id;
    }
    getTicketId() {
        return this.ticketId;
    }
    getTFinalPrice() {
        return this.finalPrice;
    }
    getPaid() {
        return this.paid;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setPaid(value) {
        this.paid = value;
    }
}
//# sourceMappingURL=PurchaseTicket.js.map