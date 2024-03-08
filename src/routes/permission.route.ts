import { Router } from "express";
import { createPermission, getAllPermissions, getPermissionById, updatePermissionStatus } from "../controller/permissions.controller";


const permissionRouter=Router();

permissionRouter.get("/getallpermissions",getAllPermissions);

permissionRouter.post("/getpermission/role",getPermissionById);

permissionRouter.post("/createpermission",createPermission);

permissionRouter.put("/updatestatus/:id",updatePermissionStatus);

export default permissionRouter;
