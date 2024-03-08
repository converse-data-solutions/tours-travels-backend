import { RequestHandler } from "express";
import { Country } from "../model/countries.model";


export const getAllcountries:RequestHandler=async(req,res,next)=>{
    try{
        const countryList=await Country.findAll();
        const responseData = {
            isSuccess: true,
            message: "Country details get successfully",
            data: countryList,
          };
          return res.status(200).json(responseData)
    }catch (ex: any) {
        console.log(ex)
      return res.status(400).json({
        isSuccess: false,
        message: "Country details not get",
        data: ex.errors,
      });
    }
}
