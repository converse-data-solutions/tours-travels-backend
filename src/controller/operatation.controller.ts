import { RequestHandler } from "express";
import { Operation } from "../model/operation.model";
export const operationList:RequestHandler=async(req,res,next)=>{
    try{
        const permissionList=await Operation.findAll();
        const responseData = {
            isSuccess: true,
            message: "operation details get successfully",
            data: permissionList,
          };
          return res.status(200).json(responseData)
    }catch (ex: any) {
        console.log(ex)
      return res.status(400).json({
        isSuccess: false,
        message: "Operation details not get",
        data: ex.errors,
      });
    }


}