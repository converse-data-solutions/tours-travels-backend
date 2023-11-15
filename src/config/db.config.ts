import { Sequelize } from "sequelize-typescript";
import { Userinfo } from "../models/userinfo.model";
import { Role } from "../models/role.model";
import { Package } from "../models/package.model";
require('dotenv').config();

const connection = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST||'localhost',
  username: process.env.DB_USERNAME||'root',
  password: process.env.DB_PASSWORD||'Converse@123',
  database: process.env.DB_NAME||'travelinwebsite',
  logging: false,
  models: [Userinfo, Role, Package],
});


export default connection;
