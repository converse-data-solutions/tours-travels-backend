import { Sequelize } from "sequelize-typescript";
import { Userinfo } from "../models/userinfo.model";
import { Role } from "../models/role.model";
import { Package } from "../models/package.model";

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "Converse@123",
  database:"travelinwebsite",
  logging: false,
  models: [Userinfo, Role,Package],
});

export default connection;