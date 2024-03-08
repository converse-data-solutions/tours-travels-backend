import { Router } from "express";
import { getAllStates } from "../controller/state.controller";
const stateRouter=Router();


stateRouter.get("/getallstates",getAllStates);

export default stateRouter;