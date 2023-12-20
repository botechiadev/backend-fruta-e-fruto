"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseDetails = void 0;
const interfaces_1 = require("./../interfaces/interfaces");
class PurchaseDetails {
    constructor(id, purchaseList = [], paymentType, buyerId, accountId) {
        this.purchaseList = [];
        this.totalPrice = 0;
        this.percentOfDiscount = 0;
        this.totalDiscount = 0;
        this.finalPrice = 0;
        this.totalItems = 0;
        this.id = id;
        this.purchaseList = purchaseList;
        this.paymentType = paymentType;
        this.buyerId = buyerId;
        this.accountId = accountId;
        this.calculateTotalItems();
        this.calculateTotalDiscount();
        this.calculateFinalPrice();
    }
    getId() {
        return this.id;
    }
    getPurchaseList() {
        return this.purchaseList;
    }
    getPercentOfDiscount() {
        return this.percentOfDiscount;
    }
    getTotalDiscount() {
        return this.totalDiscount;
    }
    getFinalPrice() {
        return this.finalPrice;
    }
    getTotalItems() {
        return this.totalItems;
    }
    getPaymentType() {
        return this.paymentType;
    }
    getBuyerId() {
        return this.buyerId;
    }
    getAccountId() {
        return this.accountId;
    }
    setPurchaseList(value) {
        this.purchaseList = value;
        this.calculateTotalItems();
        this.calculateTotalDiscount();
        this.calculateFinalPrice();
    }
    setTotalPrice(value) {
        this.totalPrice = value;
    }
    setTotalDiscount(value) {
        this.totalDiscount = value;
    }
    setFinalPrice(value) {
        this.finalPrice = value;
    }
    setTotalItems(value) {
        this.totalItems = value;
    }
    setPaymentType(value) {
        this.paymentType = value;
        this.calculateFinalPrice();
    }
    setBuyerId(value) {
        this.buyerId = value;
    }
    setAccountId(value) {
        this.accountId = value;
    }
    addItemToPurchaseList(item) {
        this.purchaseList.push(item);
        this.calculateTotalItems();
        this.calculateTotalDiscount();
        this.calculateFinalPrice();
    }
    calculateTotalItems() {
        this.setTotalItems(this.purchaseList.length);
    }
    calculateTotalDiscount() {
        const calculatedTotalDiscount = (this.percentOfDiscount / 100) * this.totalPrice;
        this.setTotalDiscount(calculatedTotalDiscount);
    }
    calculateFinalPrice() {
        let finalPrice = this.totalPrice - this.totalDiscount;
        switch (this.paymentType) {
            case interfaces_1.PAYMENT_TYPES.JUROS5:
                finalPrice *= 1.05;
                break;
            case interfaces_1.PAYMENT_TYPES.JUROS10:
                finalPrice *= 1.1;
                break;
        }
        this.setFinalPrice(finalPrice);
    }
}
exports.PurchaseDetails = PurchaseDetails;
//# sourceMappingURL=PurchaseDetails.js.map