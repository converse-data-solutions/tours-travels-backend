import { RequestHandler } from "express";
import fs from "fs-extra";
import { Userinfo } from "../models/userinfo.model";
const jwt = require("jsonwebtoken");

const SecureKey = "converse@123";

export const verify = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      isSuccess: false,
      message: "Unauthorized: No token provided",
    });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SecureKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      isSuccess: false,
      message: "Unauthorized: Invalid token",
    });
  }
};

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    var todos = await Userinfo.create({ ...req.body });

    return res.status(200).json({
      isSuccess: true,
      message: "User created successfully",
      data: todos,
    });
  } catch (ex: any) {
    return res.status(400).json({
      isSuccess: false,
      message: "User not created ",
      data: ex.errors,
    });
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser: Userinfo | null = await Userinfo.findByPk(id);
    await Userinfo.destroy({ where: { id } });

    return res.status(200).json({
      isSuccess: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (ex: any) {
    return res
      .status(400)
      .json({ isSuccess: false, message: "", data: ex.errors });
  }
};
export const getAllUser: RequestHandler = async (req, res, next) => {
  try {
    const allUserinfo: Userinfo[] = await Userinfo.findAll();

    const usersWithImages: Userinfo[] = [];

    for (const userinfo of allUserinfo) {
      const filePath = `/home/converse/projects/ToursiteBE/travels-backend/tours-travels-backend/Uploads/${userinfo?.file_name}`;

      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        const dataURL = `data:image/jpeg;base64,${fileBuffer.toString(
          "base64"
        )}`;
        userinfo.file_name = dataURL;
      }

      usersWithImages.push(userinfo);
    }

    return res.status(200).json({
      isSuccess: true,
      message: "Users fetched successfully",
      data: usersWithImages,
    });
  } catch (ex: any) {
    console.log(ex);
    return res
      .status(400)
      .json({ isSuccess: false, message: "", data: ex.errors });
  }
};

export const getUserById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const userinfo = await Userinfo.findByPk(id);

  if (!userinfo) {
    return res.status(404).json({ error: "User not found" });
  }
  const filePath = `/home/converse/projects/ToursiteBE/travels-backend/tours-travels-backend/Uploads/${userinfo?.file_name}`;

  if (!fs.existsSync(filePath)) {
  }
  const fileBuffer = fs.readFileSync(filePath);

  const dataURL = `data:image/jpeg;base64,${fileBuffer.toString("base64")}`;

  if (dataURL) {
    userinfo.file_name = dataURL;
  }

  return res
    .status(200)
    .json({ message: "User fetched successfully", data: userinfo });
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Userinfo.update({ ...req.body }, { where: { id } });
    const updatedUserinfo: Userinfo | null = await Userinfo.findByPk(id);

    return res.status(200).json({
      isSuccess: true,
      message: "User updated successfully",
      data: updatedUserinfo,
    });
  } catch (ex: any) {
    return res
      .status(200)
      .json({ isSuccess: false, message: "", data: ex.errors });
  }
};

export const uploadImageUserid: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const file_name = req.file?.filename;

    const [updatedRowCount, updatedUserinfo] = await Userinfo.update(
      { file_name },
      { where: { id: id }, returning: true }
    );

    if (updatedRowCount === 0) {
      return res.status(404).json({
        isSuccess: false,
        message: `User with id ${id} not found.`,
        data: null,
      });
    }

    return res.status(201).json({
      isSuccess: true,
      message: "User updated successfully",
      data: updatedUserinfo,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      isSuccess: false,
      message: "Internal server error",
      data: null,
    });
  }
};
export const SignInUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const Signin = await Userinfo.findOne({
      where: {
        email: email,
      },
    });
    if (!Signin) {
      return res.status(404).json({ error: "User not found" });
    }
    if (password === Signin.password) {
      const accesstoken = jwt.sign(
        { userId: Signin.id, email: Signin.email },
        SecureKey,
        { expiresIn: "1d" }
      );

      const refreshToken = jwt.sign(
        { userId: Signin.id, email: Signin.email },
        SecureKey
      );

      res.cookie("access_token", accesstoken, { httpOnly: true });
      res.cookie("refresh_token", refreshToken, { httpOnly: true });

      return res.status(200).json({
        message: "User signed in successfully",
        data: Signin,
        accessToken: accesstoken,
        refreshToken: refreshToken,
      });
    } else {
      return res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
