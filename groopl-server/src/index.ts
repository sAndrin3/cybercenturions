import { MikroORM } from "@mikro-orm/core"
import { COOKIE_NAME, __prod__ } from "./constants";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import console from "console";
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import session from "express-session";
import cors from "cors";
import { User } from "./entitites/User";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const app = express();

  let RedisStore = require("connect-redis")(session);

  // redis@v4
  const { createClient } = require("redis");
  let redisClient = createClient({ legacyMode: true });
  redisClient.on("connect", () => console.log("Connected to Redis!"));
  redisClient.on("error", (err: Error) =>
    console.log("Redis Client Error", err)
  );
  redisClient.connect();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 315360000000,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: "qweqweqwe",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    plugins: [
      __prod__
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground({
            settings: {
              "request.credentials": "include",
            },
          }),
    ],
    context: ({ req, res }) => ({ em: orm.em, req, res }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log(`app listening on localhost:4000 !`);
  });
};

main();