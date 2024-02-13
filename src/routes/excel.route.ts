import { Router } from "express";
import { exportToCSV } from "../controller/excel.controller";
const express = require("express");

const excelRouter = Router();
const excelController = require("../controller/excel.controller");

excelRouter.get("/csv", excelController.exportToCSV);
export default excelRouter;
