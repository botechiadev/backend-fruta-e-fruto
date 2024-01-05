"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(id, item, description, imageUrl, price, category) {
        this.id = id;
        this.item = item;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
        this.category = category;
    }
    getId() {
        return this.id;
    }
    getItem() {
        return this.item;
    }
    getDescription() {
        return this.description;
    }
    setDescription(value) {
        this.description = value;
    }
    getImageUrl() {
        return this.imageUrl;
    }
    setImageUrl(value) {
        this.imageUrl = value;
    }
    getPrice() {
        return this.price;
    }
    setPrice(value) {
        this.price = value;
    }
    getCategory() {
        return this.category;
    }
    setCategory(value) {
        this.category = value;
    }
}
exports.Product = Product;
//# sourceMappingURL=Product.js.map