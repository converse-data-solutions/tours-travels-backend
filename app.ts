import express from "express";
import connection from "./src/config/db.config";
import { json, urlencoded } from "body-parser";
import roleRouter from "./src/routes/role.routes";
import permissionRouter from "./src/routes/permission.route";

import cors from "cors";
import idgenRouter from "./src/routes/idgen.route";
import operationRouter from "./src/routes/operation.route";
import userRouter from "./src/routes/user.route";
import countryRouter from "./src/routes/country.route";
import stateRouter from "./src/routes/state.route";
import languageRouter from "./src/routes/language.route";
import currencyRouter from "./src/routes/currecy.route";
const app = express();
const cookieParser = require("cookie-parser");

const allowedOrigins = "*";

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  preflightContinue: true,
};
app.use(cookieParser());
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.log(req.body);
    res.status(500).json({ message: err.message });
  },
);
 app.use("/role",roleRouter );
 app.use("/idgen",idgenRouter);
 app.use("/permission",permissionRouter);
 app.use("/operation",operationRouter);
 app.use("/user",userRouter);
 app.use("/country",countryRouter);
 app.use("/state",stateRouter);
 app.use("/language",languageRouter);
 app.use("/currency",currencyRouter)

connection
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err: any) => {
    console.log("Error", err);
  });

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server started on port ${process.env.PORT || 8000}`);
});
