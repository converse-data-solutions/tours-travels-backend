import { Sequelize } from "sequelize-typescript";
import {Role} from "../model/role.model";
import { Idgen } from "../model/idgen.model";
import { Permission } from "../model/permission.model";
import { Operation } from "../model/operation.model";
import { User } from "../model/users.model";
import { Country } from "../model/countries.model";
import { State } from "../model/states.model";
import  {Language} from "../model/language.model";
import { Currency } from "../model/currencies.model";
import { History } from "../model/usersHistory.model";
require("dotenv").config();

console.log(process.env.DB_HOST);


const connection = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
   models: [Role,Idgen,Permission,Operation,User,Country,State,Language,Currency,History],
});

export default connection;
