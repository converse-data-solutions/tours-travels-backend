
import { RequestHandler } from "express";
import { Language } from "../model/language.model";
export const getAllLanguage:RequestHandler=async(req,res,next)=>{
    try{
        const languageList=await Language.findAll();
        const responseData = {
            isSuccess: true,
            message: "State details get successfully",
            data: languageList,
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
