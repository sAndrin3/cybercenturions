import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { dbName, dbPass, __prod__ } from "./constants";
import { Post } from "./entitites/Post";
import { User } from "./entitites/User";

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
        snapshot: false,
    },
    entities: [Post, User],
    dbName: dbName,
    type: "postgresql",
    password: dbPass,
    debug: !__prod__,
    allowGlobalContext: true
}  as Parameters<typeof MikroORM.init>[0];