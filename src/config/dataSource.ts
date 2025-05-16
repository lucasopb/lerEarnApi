import { DataSource } from "typeorm";
import { Book } from "../entities/Book";
import { Author } from "../entities/Author";
import { Category } from "../entities/Category";
import { User } from "../entities/User";
import { Review } from "../entities/Review";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgres-db",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "meubanco",
  synchronize: true,
  logging: false,
  entities: [Book, Author, User, Category, Review],
  migrations: ["src/migrations/**/*.ts"],
});

