"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('HELLO WORD');
});
exports.default = express_1.Router;
//# sourceMappingURL=auth.js.map