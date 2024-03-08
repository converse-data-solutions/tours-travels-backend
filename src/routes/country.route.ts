import { Router } from "express";
import { getAllcountries } from "../controller/country.controller";
const countryRouter=Router();


countryRouter.get("/getallcountries",getAllcountries);

export default countryRouter;