import { Request, Response, NextFunction } from "express";
import fs from "fs";
import { Package } from "../models/package.model";
import { Op } from "sequelize";
import puppeteer from "puppeteer";


const hbs = require("hbs");
const PuppeteerHTMLPDF = require("puppeteer-html-pdf");

export const exportToPDF = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title } = req.query;

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  try {
    const whereClause = title
      ? {
          title: {
            [Op.like]: `${title}%`,
          },
        }
      : {};

    const allPackageinfo: Package[] = await Package.findAll({
      where: whereClause,
    });
    const pdfData = {
      packages: allPackageinfo.map((packageInfo) => {
        const formattedStartDate = formatDate(packageInfo.toJSON().start_date);
        const isPublished = packageInfo.toJSON().published === 1;
        const publishedStatus = isPublished ? "published" : "not published";

        return {
          ...packageInfo.toJSON(),
          start_date: formattedStartDate,
          published: publishedStatus,
        };
      }),
      generatedAt: new Date().toLocaleString(),
    };

    const htmlPDF = new PuppeteerHTMLPDF();
    htmlPDF.setOptions({ format: "A4" });
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
    });
    
    const page = await browser.newPage();

    const html = await htmlPDF.readFile("views/invoice.hbs", "utf8");
    const template = hbs.compile(html);
    const content = template(pdfData);

    await page.setContent(content);
    const pdfBuffer = await page.pdf();

    await browser.close();


    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=exported-data.pdf",
    );

    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ isSuccess: false, message: "Internal Server Error" });
  }
};
