import { Router } from "express";

const xlsxController = require("../controller/excelxlsx.controller");

const xlsxRouter = Router();
xlsxRouter.get("/xlsx", xlsxController.exportToExcel);
export default xlsxRouter;
