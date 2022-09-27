import * as dotenv from 'dotenv'
dotenv.config()

export const __prod__ = process.env["NODE_ENV"] === 'production'
export const dbName = process.env["DB_NAME"];
export const dbPass = process.env["DB_PASSWORD"];
export const COOKIE_NAME = "qid";