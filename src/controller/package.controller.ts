import { RequestHandler } from "express";
import fs from "fs-extra";
import { Package } from "../models/package.model";
import { Op } from "sequelize";

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
  next,
) => {
  try {
    const { id } = req.params;
    const file_name = req.file?.filename;

    const [updatedRowCount, updatedPackage] = await Package.update(
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
          "base64",
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
          customProperty: "No Image Available",
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
      .status(400)
      .json({ isSuccess: false, message: "", data: ex.errors });
  }
};

export const countryList: RequestHandler = async (
  req: any,
  res: any,
  next: any,
) => {
  try {
    const { country: selectedCountry } = req.query;

    const allPackages: Package[] = await Package.findAll();
    const PackageWithImages: Package[] = [];

    for (const packageInfo of allPackages) {
      const filePath = `../../PackageUploads/${packageInfo?.file_name}`;

      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        const dataURL = `data:image/jpeg;base64,${fileBuffer.toString(
          "base64",
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
          customProperty: "No Image Available",
        };
      }
    });

    const countryStateCounts: {
      [key: string]: { count: number; states: string[] };
    } = {};

    allPackages.forEach((packageInfo) => {
      const country = packageInfo.country;
      const state = packageInfo.state;

      if (countryStateCounts[country]) {
        countryStateCounts[country].count++;
        if (!countryStateCounts[country].states.includes(state)) {
          countryStateCounts[country].states.push(state);
        }
      } else {
        countryStateCounts[country] = {
          count: 1,
          states: [state],
        };
      }
    });

    const uniqueCountries = Object.keys(countryStateCounts).reduce(
      (acc: any, country: any) => {
        acc[country] = {
          count: countryStateCounts[country].count,
          states: countryStateCounts[country].states,
        };
        return acc;
      },
      {},
    );

    const sortedUniqueCountries = Object.keys(uniqueCountries).sort(
      (a, b) => uniqueCountries[b].count - uniqueCountries[a].count,
    );

    const filteredResponseData = selectedCountry
      ? responseData.filter(
          (packageInfo) => packageInfo.country === selectedCountry,
        )
      : responseData;

    const sortedFilteredResponseData = filteredResponseData.sort((a, b) => {
      const countA = countryStateCounts[a.country]?.count || 0;
      const countB = countryStateCounts[b.country]?.count || 0;
      return countB - countA;
    });

    return res.status(200).json({
      isSuccess: true,
      message: "Packages fetched successfully",
      data: countryStateCounts,
    });
  } catch (ex: any) {
    return res.status(400).json({
      isSuccess: false,
      message: "Internal server error",
      data: null,
    });
  }
};

export const allPackageByDate: RequestHandler = async (req, res, next) => {
  try {
    const allPackages: Package[] = await Package.findAll();

    const responseData = allPackages.map((packageInfo) => {
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
          customProperty: "No Image Available",
        };
      }
    });

    const currentDate = new Date();
    const nextSevenDays = new Date(currentDate);
    nextSevenDays.setDate(currentDate.getDate() + 7);

    const packagesForNextSevenDays = responseData.filter((packageInfo) => {
      const packageStartDate = new Date(packageInfo.start_date);
      return (
        packageStartDate >= currentDate && packageStartDate <= nextSevenDays
      );
    });

    return res.status(200).json({
      isSuccess: true,
      message:
        "All package details fetched and filtered successfully for the next 7 days",

      data: packagesForNextSevenDays,
    });
  } catch (ex: any) {
    return res
      .status(400)
      .json({ isSuccess: false, message: "", data: ex.errors });
  }
};

export const searchPackages: RequestHandler = async (req, res, next) => {
  try {
    const { country, date, durationType } = req.query;

    const allPackages: Package[] = await Package.findAll();

    const filteredPackages = allPackages.filter((packageInfo: any) => {
      const matchesCountry = !country || packageInfo.country.toLowerCase();
      const matchesDate =
        !date ||
        new Date(packageInfo.start_date).toISOString().split("T")[0] === date;
      const matchesDurationType =
        !durationType || packageInfo.duration_type.toLowerCase();

      return matchesCountry && matchesDate && matchesDurationType;
    });

    const responseData = filteredPackages.map((packageInfo) => {
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
          customProperty: "No Image Available",
        };
      }
    });

    return res.status(200).json({
      isSuccess: true,
      message: "Packages fetched successfully based on search criteria",
      data: responseData,
    });
  } catch (ex: any) {
    return res.status(400).json({
      isSuccess: false,
      message: "Internal server error",
      data: null,
    });
  }
};

export const getAllPackageByOffer: RequestHandler = async (req, res, next) => {
  try {
    const allPackageinfo: Package[] = await Package.findAll({
      where: {
        published: 1,
        offer: {
          [Op.ne]: "No Offer",
        },
      },
    });

    for (const packageInfo of allPackageinfo) {
      const filePath = `../../PackageUploads/${packageInfo?.file_name}`;

      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        const dataURL = `data:image/jpeg;base64,${fileBuffer.toString(
          "base64",
        )}`;
        packageInfo.file_name = dataURL;
      }
    }

    const responseData = allPackageinfo.map((packageInfo) => {
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
          customProperty: "No Image Available",
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
