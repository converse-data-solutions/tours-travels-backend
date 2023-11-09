import { Router } from "express";


import { createPackage,deletePackage,updatePackage,getAllPackage,getPackageById,uploadImageByPackageId } from "../controller/package.controller";
import multer from "multer";

const packageRouter = Router();

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "PackageUploads/");
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new package
 *     description: Create a new package.
 *     responses:
 *       '200':
 *         description: Successful response
 */
packageRouter.post("/create", createPackage);
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all Packages
 *     description: Get all packages.
 *     responses:
 *       '200':
 *         description: Successful response
 */
packageRouter.get("/get", getAllPackage);
/**
 * @swagger
 * /package/{id}:
 *   get:
 *     summary: Get a package by ID
 *     description: Get a package by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the packageto retrieve
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Successful response
 */

packageRouter.get("/:id",  getPackageById);
/**
 * @swagger
 * /package/{id}:
 *   put:
 *     summary: Update a package
 *     description: Update a package by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the package to update
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Successful response
 */
packageRouter.put("/:id"  ,updatePackage);
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a package
 *     description: Delete a package by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the package to delete
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Successful response
 */
packageRouter.delete("/:id", deletePackage);
packageRouter.post("/upload/:id", upload.single("file"), uploadImageByPackageId);

export default packageRouter;