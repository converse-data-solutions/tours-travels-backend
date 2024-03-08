import { Router } from "express";
import { getAllLanguage } from "../controller/language.controller";
const languageRouter=Router();


languageRouter.get("/getalllanguages",getAllLanguage);

export default languageRouter;