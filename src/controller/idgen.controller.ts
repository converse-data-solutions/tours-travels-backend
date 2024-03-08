import { RequestHandler } from "express";
import { Idgen } from "../model/idgen.model";
import sequelize from "sequelize";



import { Response } from 'express';

export const getMaxVals:RequestHandler = async (req,res,next) => {
  try {
    const maxVals = await Idgen.findAll();
    const maxval = maxVals.length > 0 ? maxVals[0].dataValues.maxval : null;

    const responseData = {
      isSuccess: true,
      message: "All role details",
      data: maxVals
    };
    return res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching maxVals:', error);
    throw error;
  }
};

export const extractMaxVal = (maxVals: any[]) => {
    return maxVals.length > 0 ? maxVals[0].dataValues.maxval : null;
  };
