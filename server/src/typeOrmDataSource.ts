import { DataSource } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import path from "path";

export const dataSource = new DataSource({
  type: "postgres",
  database: "postgres",
  username: "postgres",
  password: "postgres",
  logging: true,
  synchronize: true,
  migrations: [path.join(__dirname, "./migrations/*")],
  entities: [Post, User],
});
