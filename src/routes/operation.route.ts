import { Router } from "express";
import { operationList } from "../controller/operatation.controller";

const operationRouter=Router();


operationRouter.get("/operationdetails",operationList);

export default operationRouter;