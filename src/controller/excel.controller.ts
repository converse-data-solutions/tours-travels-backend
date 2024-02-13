import { Request, Response, NextFunction } from "express";
import fs from "fs";
import { createObjectCsvWriter } from "csv-writer";
import { Package } from "../models/package.model";
import { Op } from "sequelize";

const { convert } = require("html-to-text");
const options = {
  wordwrap: 130,
};

export const exportToCSV = async (
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

    const csvWriter = createObjectCsvWriter({
      path: `${__dirname}/exported-data.csv`,
      header: [
        { id: "id", title: "ID" },
        { id: "title", title: "Title" },
        { id: "start_date", title: "Start Date" },
        { id: "description", title: "Description" },
        { id: "no_of_person", title: "No. of Person" },
        { id: "days_and_night", title: "Days & Night" },
        { id: "country", title: "Country" },
        { id: "state", title: "State" },
        { id: "price", title: "Price" },
        { id: "published", title: "Published" },
        { id: "offer", title: "Offer" },
        { id: "category", title: "Category" },
      ],
    });

    const csvData = allPackageinfo.map((packageInfo) => ({
      id: packageInfo.toJSON().id,
      title: packageInfo.toJSON().title,
      start_date: formatDate(packageInfo.toJSON().start_date),
      description: convert(packageInfo.toJSON().description, options),
      no_of_person: packageInfo.toJSON().no_of_person,
      days_and_night: packageInfo.toJSON().days_and_night,
      country: packageInfo.toJSON().country,
      state: packageInfo.toJSON().state,
      price: packageInfo.toJSON().price,
      published:
        packageInfo.toJSON().published === 1 ? "published" : "not published",
      offer: packageInfo.toJSON().offer,
      category: packageInfo.toJSON().category,
    }));

    await csvWriter.writeRecords(csvData);

    const csvFilePath = `${__dirname}/exported-data.csv`;

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=exported-data.csv",
    );

    const stream = fs.createReadStream(csvFilePath);
    stream.pipe(res);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ isSuccess: false, message: "Internal Server Error" });
  }
};
