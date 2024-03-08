import { Router } from "express";
import { getAllUsers } from "../controller/users.controller";

const userRouter=Router();

userRouter.get("/allusers",getAllUsers);

export default userRouter;

