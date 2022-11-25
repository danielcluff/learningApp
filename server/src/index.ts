import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import express from "express";
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import session from "express-session";
import connectRedis from "connect-redis";
import { createClient } from "redis";

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();
    
    const app = express();

    const RedisStore = connectRedis(session);
    // const redisClient = createClient();                       // v3
    const redisClient = createClient({ legacyMode: true });   // v4
    redisClient.connect().catch(console.error);               // v4

    app.use(
      session({
        name: 'qid',
        store: new RedisStore({
          client: redisClient,
          disableTouch: true,
        }),
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
          httpOnly: true,
          sameSite: 'lax', // csrf
          secure: __prod__ // cookie only works in https
        },
        saveUninitialized: false,
        secret: "asdoifjo3nnansdoiuvcdnnd",
        resave: false,
      })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ em: orm.em, req, res })
    })

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    
    app.listen(4000, () => {
        console.log('server started on localhost:4000')
    })
}

main().catch((err) => {
    console.error(err)
});

console.log('hello world')

// 1:42:54