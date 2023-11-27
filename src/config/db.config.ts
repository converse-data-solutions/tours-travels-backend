import { Sequelize } from "sequelize-typescript";
import { Userinfo } from "../models/userinfo.model";
import { Role } from "../models/role.model";
import { Package } from "../models/package.model";
import { Booking } from "../models/booknow.model";
require("dotenv").config();

console.log(process.env.DB_HOST);

const connection = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  models: [Userinfo, Role, Package, Booking],
});

export default connection;
