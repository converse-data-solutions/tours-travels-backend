import { Router } from "express";

const express = require("express");

const pdfcontroller = require("../controller/pdf.controller");

const pdfRouter = Router();

pdfRouter.get("/packagepdf", pdfcontroller.exportToPDF);

export default pdfRouter;
