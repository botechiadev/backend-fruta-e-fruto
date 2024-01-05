"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseItem = void 0;
class PurchaseItem {
    constructor(id, item, quantity, unityPrice, totalPrice, purchaseId) {
        this.id = id;
        this.item = item;
        this.quantity = quantity;
        this.unityPrice = unityPrice;
        this.totalPrice = totalPrice;
        this.purchaseId = purchaseId;
    }
    getId() {
        return this.id;
    }
    getItem() {
        return this.item;
    }
    getQuantity() {
        return this.quantity;
    }
    getUnityPrice() {
        return this.unityPrice;
    }
    getTotalPrice() {
        return this.totalPrice;
    }
    getPurchaseId() {
        return this.purchaseId;
    }
    setItem(value) {
        this.item = value;
    }
    setQuantity(value) {
        this.quantity = value;
    }
    setTotalPrice(value) {
        this.totalPrice = value;
    }
    setPurchaseId(value) {
        this.purchaseId = value;
    }
    calculateTotalPrice() {
        const calculatedTotalPrice = this.quantity * this.unityPrice;
        this.setTotalPrice(calculatedTotalPrice);
    }
}
exports.PurchaseItem = PurchaseItem;
//# sourceMappingURL=PurchaseItem.js.map