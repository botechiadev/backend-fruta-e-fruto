"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
class Recipe {
    constructor(id, title, description, ingredients, cooking, imageUrl, category) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.ingredients = ingredients;
        this.cooking = cooking;
        this.imageUrl = imageUrl;
        this.category = category;
    }
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getDescription() {
        return this.description;
    }
    getIngredients() {
        return this.ingredients;
    }
    getCooking() {
        return this.cooking;
    }
    getImageUrl() {
        return this.imageUrl;
    }
    getCategory() {
        return this.category;
    }
    setTitle(value) {
        this.title = value;
    }
    setDescription(value) {
        this.description = value;
    }
    setIngredients(value) {
        this.ingredients = value;
    }
    setCooking(value) {
        this.cooking = value;
    }
    setImageUrl(value) {
        this.imageUrl = value;
    }
    setCategory(value) {
        this.category = value;
    }
}
exports.Recipe = Recipe;
//# sourceMappingURL=Recipe.js.map