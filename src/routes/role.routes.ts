import { Router } from "express";

import { getAllRoles, getRoleById, updateRoleStatus, updateRoles } from "../controller/role.controller";
import { createRoles } from "../controller/role.controller";

const roleRouter=Router();

roleRouter.get("/getroles",getAllRoles);
roleRouter.post("/createroles",createRoles);
roleRouter.put("/updateroles/:id",updateRoles);
roleRouter.get("/getrolebyid/:id",getRoleById)
roleRouter.put("/delete/status/:id",updateRoleStatus)

export default roleRouter;