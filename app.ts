import express from "express";
import connection from "./src/config/db.config";
import { json, urlencoded } from "body-parser";
import userRouter from "./src/routes/user.route";
import packageRouter from "./src/routes/package.route";
import bookingRouter from "./src/routes/booking.route";
import excelRouter from "./src/routes/excel.route";
import xlsxRouter from "./src/routes/excelxlsx.route";
import cors from "cors";
import pdfRouter from "./src/routes";
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
app.use("/user", userRouter);
app.use("/package", packageRouter);
app.use("/booking", bookingRouter);
app.use("/index", pdfRouter);
app.use("/excel", excelRouter);
app.use("/excelxlsx", xlsxRouter);

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
