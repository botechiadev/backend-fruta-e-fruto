"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
class RecipesController {
    constructor() {
        this.getAllRecipes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.status(200).json({ message: "Resultado usuarios", result: this.recipesData });
        });
        this.getRecipeById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const idSelect = req.params.id;
            const recipe = this.recipesData.find((item) => item.id === idSelect);
            if (!recipe) {
                res.status(404).json({ message: `"404": Receita NÃO encontrada, verifique o ${idSelect}` });
            }
            else {
                res.status(200).json({ message: "Resultado usuarios", result: recipe });
            }
        });
        this.createRecipe = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { inputTitle: title, inputDescription: description, inputIngredient: ingredients, inputCooking: cooking, inputImgUrl: imgUrl, inputCategory: category } = req.body;
                const newObject = Object.assign(Object.assign({}, req.body), { id: (0, uuid_1.v4)() });
                this.recipesData.push(newObject);
                this.saveRecipes();
                res.status(201).json(newObject);
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Erro ao criar a receita.');
            }
        });
        this.editRecipe = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idSelect = req.params.id;
                const recipeIndex = this.recipesData.findIndex((item) => item.id === idSelect);
                if (recipeIndex === -1) {
                    res.status(404).json({ message: `"404": Receita NÃO encontrada, verifique o ${idSelect}` });
                }
                else {
                    const { inputTitle: title, inputDescription: description, inputIngredient: ingredients, inputCooking: cooking, inputImgUrl: imgUrl, inputCategory: category } = req.body;
                    this.recipesData[recipeIndex] = Object.assign(Object.assign({}, this.recipesData[recipeIndex]), req.body);
                    this.saveRecipes();
                    res.status(200).json({ message: "Receita atualizada com sucesso", result: this.recipesData[recipeIndex] });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Erro ao editar a receita.');
            }
        });
        this.recipesFilePath = path_1.default.join(__dirname, '../../json/jsonRecipes.json');
        this.recipesData = this.loadRecipes();
    }
    loadRecipes() {
        try {
            const fileContent = fs_1.default.readFileSync(this.recipesFilePath, 'utf-8');
            return JSON.parse(fileContent);
        }
        catch (error) {
            console.error(error);
            return [];
        }
    }
    saveRecipes() {
        try {
            fs_1.default.writeFileSync(this.recipesFilePath, JSON.stringify(this.recipesData));
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = RecipesController;
//# sourceMappingURL=recipesController.js.map