"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Book_1 = require("../entities/Book");
const Author_1 = require("../entities/Author");
const Category_1 = require("../entities/Category");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "postgres-db",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "meubanco",
    synchronize: false,
    logging: false,
    entities: [Book_1.Book, Author_1.Author, Category_1.Category],
    migrations: ["src/migrations/**/*.ts"],
});
