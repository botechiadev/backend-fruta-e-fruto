"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = Number(process.env.PORT) || 3001;
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const premios_1 = __importDefault(require("./router/premios"));
const products_1 = __importDefault(require("./router/products"));
const purchases_1 = __importDefault(require("./router/purchases"));
const users_1 = __importDefault(require("./router/users"));
const auth_1 = __importDefault(require("./router/auth"));
const score_1 = __importDefault(require("./router/score"));
const premiosRouter = new premios_1.default();
const usersRouter = new users_1.default();
const productsRouter = new products_1.default();
const purchasesRouter = new purchases_1.default();
const authRouter = new auth_1.default();
const scoreRouter = new score_1.default();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.resolve(__dirname, "../../public/")));
app.get("/ping", (req, res) => {
    res.send("Pong");
});
app.get("/", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "../public/index.html"));
});
app.use('/api/auth', authRouter.getRouter());
app.use('/api/premios', premiosRouter.getRouter());
app.use('/api/products', productsRouter.getRouter());
app.use('/api/users', usersRouter.getRouter());
app.use('/api/purchases', purchasesRouter.getRouter());
app.use('/api/score', scoreRouter.getRouter());
app.listen(3001, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map