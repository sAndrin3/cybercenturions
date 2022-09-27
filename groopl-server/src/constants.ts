import * as dotenv from 'dotenv'
dotenv.config()

export const __prod__ = process.env["NODE_ENV"] === 'production'
export const dbName = process.env["DB_NAME"];
export const dbPass = process.env["DB_PASSWORD"];
export const secret: string | string[] =
  process.env["SECRET"] || "keyboard cat";
export const COOKIE_NAME: string = process.env["COOKIE_NAME"] || "qid";
export const FORGET_PASSWORD_PREFIX = "forget-password:"