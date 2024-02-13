import { Request, Response, NextFunction } from "express";
import fs from "fs";
import { Package } from "../models/package.model";
import { Op } from "sequelize";

const { convert } = require("html-to-text");
const exceljs = require("exceljs");
const options = {
  wordwrap: 130,
};

export const exportToExcel = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title } = req.query;

  try {
    const whereClause = title
      ? {
          title: {
            [Op.like]: `${title}%`,
          },
        }
      : {};

    const formatDate = (dateString: any) => {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const allPackageinfo: Package[] = await Package.findAll({
      where: whereClause,
    });

    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("Package Data");

    const headers = [
      "ID",
      "Title",
      "Start Date",
      "Description",
      "No. of Person",
      "Days & Night",
      "Country",
      "State",
      "Price",
      "Published",
      "Offer",
      "Category",
    ];

    worksheet.addRow(headers);

    allPackageinfo.forEach((packageInfo) => {
      worksheet.addRow([
        packageInfo.toJSON().id,
        packageInfo.toJSON().title,
        formatDate(packageInfo.toJSON().start_date),
        convert(packageInfo.toJSON().description, options),
        packageInfo.toJSON().no_of_person,
        packageInfo.toJSON().days_and_night,
        packageInfo.toJSON().country,
        packageInfo.toJSON().state,
        packageInfo.toJSON().price,
        packageInfo.toJSON().published === 1 ? "published" : "not published",
        packageInfo.toJSON().offer,
        packageInfo.toJSON().category,
      ]);
    });

    const excelFilePath = `${__dirname}/exported-data.xlsx`;
    await workbook.xlsx.writeFile(excelFilePath);
    console.log("Final Excel Data:", allPackageinfo);


    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=exported-data.xlsx",
    );

    const stream = fs.createReadStream(excelFilePath);
    stream.pipe(res);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ isSuccess: false, message: "Internal Server Error" });
  }
};
