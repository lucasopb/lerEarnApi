"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config"); // precisa vir antes de tudo
const express_1 = __importDefault(require("express"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const dataSource_1 = require("./config/dataSource");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/category', categoryRoutes_1.default);
dataSource_1.AppDataSource.initialize()
    .then(() => {
    console.log("📦 Conexão com o banco de dados estabelecida com sucesso!");
})
    .catch((error) => {
    console.error("❌ Erro ao conectar com o banco de dados:", error);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
