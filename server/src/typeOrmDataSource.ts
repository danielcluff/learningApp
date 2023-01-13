import { DataSource } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/User";

export const dataSource = new DataSource({
  type: "postgres",
  database: "postgres",
  username: "postgres",
  password: "postgres",
  logging: true,
  synchronize: true,
  entities: [Post, User],
});
