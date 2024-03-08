import { RequestHandler } from "express";
import { Currency } from "../model/currencies.model";
export const getAllCurrency:RequestHandler=async(req,res,next)=>{
    try{
        const currencyList=await Currency.findAll();
        const responseData = {
            isSuccess: true,
            message: "State details get successfully",
            data: currencyList,
          };
          return res.status(200).json(responseData)
    }catch (ex: any) {
        console.log(ex)
      return res.status(400).json({
        isSuccess: false,
        message: "State details not get",
        data: ex.errors,
      });
    }
}
