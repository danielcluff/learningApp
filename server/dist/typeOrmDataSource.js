"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const Post_1 = require("./entities/Post");
const User_1 = require("./entities/User");
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    database: "postgres",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    entities: [Post_1.Post, User_1.User],
});
//# sourceMappingURL=typeOrmDataSource.js.map