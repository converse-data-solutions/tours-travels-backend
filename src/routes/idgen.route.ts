import { Router } from "express";
import { getMaxVals } from "../controller/idgen.controller";

const idgenRouter=Router();

idgenRouter.get("/idvalue",getMaxVals);

export default idgenRouter;