import { RequestHandler } from "express";
import fs from "fs-extra";
import { Userinfo } from "../models/userinfo.model";
import { Role } from "../models/role.model";
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
    const allUserinfo: Userinfo[] = await Userinfo.findAll({
      include: [
        {
          model: Role,
          attributes: ["role_name"],
        },
      ],
    });

    const usersWithImages: any[] = [];

    for (const userinfo of allUserinfo) {
      const filePath = `../../Uploads/${userinfo?.file_name}`;

      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        const dataURL = `data:image/jpeg;base64,${fileBuffer.toString(
          "base64",
        )}`;
        userinfo.file_name = dataURL;
      }

      usersWithImages.push(userinfo);
    }
    const responseData = usersWithImages.map((user) => {
      const userJSON = user.toJSON();
      const role_name = userJSON.role?.role_name || null;

      if (userJSON.file_name !== null) {
        return {
          ...userJSON,
          role_name: userJSON.role_name?.role_name,
          file_name: userJSON.file_name,
        };
      } else {
        const { file_name, ...userDetailsWithoutFile } = userJSON;
        return {
          ...userDetailsWithoutFile,
          role_name: userDetailsWithoutFile.role_name?.role_name,
        };
      }
    });

    return res.status(200).json({
      isSuccess: true,
      message: "Users fetched successfully",
      data: responseData,
    });
  } catch (ex: any) {
    return res
      .status(400)
      .json({ isSuccess: false, message: "", data: ex.errors });
  }
};

export const getUserById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const userinfo = await Userinfo.findByPk(id, {
    include: [
      {
        model: Role,
        attributes: ["role_name"],
      },
    ],
  });

  if (!userinfo) {
    return res.status(404).json({ error: "User not found" });
  }

  const filePath = `../../Uploads/${userinfo?.file_name}`;
  const responseData = {
    message: "User fetched successfully",
    data: {
      ...userinfo.toJSON(),
      role_name: userinfo.role_name?.role_name || null,
      ...(userinfo.file_name ? { file_name: getFileDataURL(filePath) } : {}),
    },
  };

  return res.status(200).json(responseData);
};

const getFileDataURL = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    return `data:image/jpeg;base64,${fileBuffer.toString("base64")}`;
  }
  return null;
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
    const { id } = req.params;
    const file_name = req.file?.filename;

    const [updatedRowCount, updatedUserinfo] = await Userinfo.update(
      { file_name },
      { where: { id: id }, returning: true },
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
      include: [
        {
          model: Role,
          attributes: ["role_name"],
        },
      ],
    });
    if (!Signin) {
      return res.status(404).json({ error: "User not found" });
    }
    if (password === Signin.password) {
      const expiresIn = "1h";
      const accesstoken = jwt.sign(
        { userId: Signin.id, email: Signin.email },
        SecureKey,
        { expiresIn },
      );

      const refreshToken = jwt.sign(
        { userId: Signin.id, email: Signin.email },
        SecureKey,
      );

      res.cookie("access_token", accesstoken, { httpOnly: true });
      res.cookie("refresh_token", refreshToken, { httpOnly: true });

      return res.status(200).json({
        message: "User signed in successfully",
        data: {
          ...Signin.toJSON(),
          role_name: Signin.role_name?.role_name || null,
        },
        accessToken: accesstoken,
        refreshToken: refreshToken,
      });
    } else {
      return res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAgentDetails: RequestHandler = async (req, res, next) => {
  try {
    const agentDetails = await Userinfo.findAll({
      include: [
        {
          model: Role,
          attributes: ["role_name"],
        },
      ],
      attributes: [
        "id",
        "file_name",
        "role_id",
        "agent_position",
        "first_name",
      ],
      where: {
        role_id: 3,
      },
    });

    const responseData = agentDetails.map((agent) => ({
      id: agent.id,
      file_name: agent.file_name,
      role_id: agent.role_id,
      first_name: agent.first_name,
      agent_position: agent.agent_position || null,
    }));

    return res.status(200).json({
      isSuccess: true,
      message: "Agent details fetched successfully",
      data: responseData,
    });
  } catch (ex: any) {
    return res.status(400).json({
      isSuccess: false,
      message: "Error fetching agent details",
      data: ex.errors,
    });
  }
};
