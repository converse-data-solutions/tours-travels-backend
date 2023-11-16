import { RequestHandler } from "express";
import fs from "fs-extra";
import { Package } from "../models/package.model";

export const createPackage: RequestHandler = async (req, res, next) => {
  try {
    var packageList = await Package.create({ ...req.body });

    return res.status(200).json({
      isSuccess: true,
      message: "Package created successfully",
      data: packageList,
    });
  } catch (ex: any) {
    return res.status(400).json({
      isSuccess: false,
      message: "package not created ",
      data: ex.errors,
    });
  }
};

export const uploadImageByPackageId: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    const file_name = req.file?.filename;

    const [updatedRowCount, updatedPackage] = await Package.update(
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
      message: "Package image updated successfully",
      data: updatedPackage,
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: "Internal server error",
      data: null,
    });
  }
};

export const deletePackage: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPackage: Package | null = await Package.findByPk(id);
    await Package.destroy({ where: { id } });

    return res.status(200).json({
      isSuccess: true,
      message: "Package deleted successfully",
      data: deletedPackage,
    });
  } catch (ex: any) {
    return res
      .status(400)
      .json({ isSuccess: false, message: "", data: ex.errors });
  }
};

export const getAllPackage: RequestHandler = async (req, res, next) => {
  try {
    const allPackageinfo: Package[] = await Package.findAll();

    const PackageWithImages: Package[] = [];

    for (const packageInfo of allPackageinfo) {
      const filePath = `../../PackageUploads/${packageInfo?.file_name}`;

      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        const dataURL = `data:image/jpeg;base64,${fileBuffer.toString(
          "base64"
        )}`;
        packageInfo.file_name = dataURL;
      }

      PackageWithImages.push(packageInfo);
    }

    const responseData = PackageWithImages.map((packageInfo) => {
      if (packageInfo.file_name !== null) {
        return {
          ...packageInfo.toJSON(),
          file_name: packageInfo.file_name,
        };
      } else {
        const { file_name, ...packageDetailsWithoutFile } =
          packageInfo.toJSON();
        return {
          ...packageDetailsWithoutFile,
          customProperty: "No Image Available", // Add any custom property for the case when file_name is null
        };
      }
    });

    return res.status(200).json({
      isSuccess: true,
      message: "Package fetched successfully",
      data: responseData,
    });
  } catch (ex: any) {
    return res
      .status(400)
      .json({ isSuccess: false, message: "", data: ex.errors });
  }
};

export const getPackageById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const packageInfo = await Package.findByPk(id);

  if (!packageInfo) {
    return res.status(404).json({ error: "Package not found" });
  }

  const filePath = `../../PackageUploads/${packageInfo?.file_name}`;
  const responseData = {
    message: "User fetched successfully",
    data: {
      ...packageInfo.toJSON(),
      ...(packageInfo.file_name ? { file_name: getFileDataURL(filePath) } : {}),
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

export const updatePackage: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Package.update({ ...req.body }, { where: { id } });
    const updatedPackageinfo: Package | null = await Package.findByPk(id);

    return res.status(200).json({
      isSuccess: true,
      message: "User updated successfully",
      data: updatedPackageinfo,
    });
  } catch (ex: any) {
    return res
      .status(200)
      .json({ isSuccess: false, message: "", data: ex.errors });
  }
};
