import { Router } from "express";

import {
  verify,
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
  uploadImageUserid,
  SignInUser,
  getAgentDetails,
} from "../controller/user.controller";
import multer from "multer";

const userRouter = Router();

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user.
 *     responses:
 *       '200':
 *         description: Successful response
 */
userRouter.post("/create", createUser);

userRouter.get("/agent/details", verify, getAgentDetails);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     description: Get all users.
 *     responses:
 *       '200':
 *         description: Successful response
 */
userRouter.get("/get", verify, getAllUser);
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Get a user by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Successful response
 */

userRouter.get("/:id", verify, getUserById);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update a user by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to update
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Successful response
 */
userRouter.put("/:id", verify, updateUser);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to delete
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Successful response
 */
userRouter.delete("/:id",verify, deleteUser);

userRouter.post("/upload/:id", upload.single("file"), uploadImageUserid);

/**
 * @swagger
 * /signin:
 *   signinprocess:
 *     summary: check the userlist
 *     require email and password
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Successful response
 */
userRouter.post("/signin", SignInUser);

export default userRouter;
