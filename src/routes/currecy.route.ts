import { Router } from "express";
import { getAllCurrency } from "../controller/currency.controller";
const currencyRouter=Router();


currencyRouter.get("/getallcurrencies",getAllCurrency);

export default currencyRouter;