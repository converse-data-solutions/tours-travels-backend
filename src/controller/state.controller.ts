import { RequestHandler } from "express";
import { State } from "../model/states.model";

export const getAllStates:RequestHandler=async(req,res,next)=>{
    try{
        const stateList=await State.findAll();
        const responseData = {
            isSuccess: true,
            message: "State details get successfully",
            data: stateList,
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
