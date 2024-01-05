"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAYMENT_TYPES = exports.RECIPES_CATEGORY = exports.USER_ROLES = exports.PRODUCTS_CATEGORY = void 0;
var PRODUCTS_CATEGORY;
(function (PRODUCTS_CATEGORY) {
    PRODUCTS_CATEGORY[PRODUCTS_CATEGORY["horti-fruti"] = 0] = "horti-fruti";
    PRODUCTS_CATEGORY[PRODUCTS_CATEGORY["laticinios"] = 1] = "laticinios";
    PRODUCTS_CATEGORY[PRODUCTS_CATEGORY["armazem"] = 2] = "armazem";
    PRODUCTS_CATEGORY[PRODUCTS_CATEGORY["limpeza"] = 3] = "limpeza";
    PRODUCTS_CATEGORY[PRODUCTS_CATEGORY["papelaria"] = 4] = "papelaria";
    PRODUCTS_CATEGORY[PRODUCTS_CATEGORY["higiene-pessoal"] = 5] = "higiene-pessoal";
})(PRODUCTS_CATEGORY || (exports.PRODUCTS_CATEGORY = PRODUCTS_CATEGORY = {}));
var USER_ROLES;
(function (USER_ROLES) {
    USER_ROLES[USER_ROLES["Cadastrado"] = 0] = "Cadastrado";
    USER_ROLES[USER_ROLES["Cliente"] = 1] = "Cliente";
    USER_ROLES[USER_ROLES["Anonimo"] = 2] = "Anonimo";
})(USER_ROLES || (exports.USER_ROLES = USER_ROLES = {}));
;
var RECIPES_CATEGORY;
(function (RECIPES_CATEGORY) {
    RECIPES_CATEGORY[RECIPES_CATEGORY["Frutas"] = 0] = "Frutas";
    RECIPES_CATEGORY[RECIPES_CATEGORY["Vegetais"] = 1] = "Vegetais";
    RECIPES_CATEGORY[RECIPES_CATEGORY["Smoothies"] = 2] = "Smoothies";
    RECIPES_CATEGORY[RECIPES_CATEGORY["Sucos"] = 3] = "Sucos";
})(RECIPES_CATEGORY || (exports.RECIPES_CATEGORY = RECIPES_CATEGORY = {}));
var PAYMENT_TYPES;
(function (PAYMENT_TYPES) {
    PAYMENT_TYPES[PAYMENT_TYPES["JUROS0"] = 3] = "JUROS0";
    PAYMENT_TYPES[PAYMENT_TYPES["JUROS5"] = 7] = "JUROS5";
    PAYMENT_TYPES[PAYMENT_TYPES["JUROS10"] = 15] = "JUROS10";
})(PAYMENT_TYPES || (exports.PAYMENT_TYPES = PAYMENT_TYPES = {}));
//# sourceMappingURL=interfaces.js.map