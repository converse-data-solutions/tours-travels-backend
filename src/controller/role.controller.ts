import { RequestHandler } from "express";
import fs from "fs-extra";
import { Sequelize } from "sequelize";
import {Role} from "../model/role.model";
import { extractMaxVal } from "./idgen.controller";
import { Idgen } from "../model/idgen.model";
import sequelize from "sequelize";

export const getAllRoles:RequestHandler=async(req,res,next)=>{

    try{
        const roleList=await Role.findAll();
         
        const responseData={
            isSuccess:true,
            message:"All role details",
            data:roleList
        }

        return res.status(200).json(responseData);
    }
    catch(ex:any){
        res.status(400).json({
            isSuccess: false,
            message: "role details not get",
            data: ex.errors,  
        })

    }
}




export const createRoles: RequestHandler = async (req, res, next) => {

  try {
    const idgen = await Idgen.findOne({
      where: {
        idname: "roles",
      },
      attributes: [
        [sequelize.fn("MAX", sequelize.col("maxval")), "maxval"],
      ],
    });

    const nextRoleId = idgen ? idgen.get("maxval") + 1 : 1;


    const existingRole = await Role.findOne({
      where: {
        name: req.body.data.name,
      },
    });

    if (existingRole) {
      return res.status(400).json({
        isSuccess: false,
        message: "Role with the provided name already exists",
        data: null,
      });
    }



    console.log("Request Body:", req.body);

    
    const newRole = await Role.create({
      ...req.body.data,


      role_id: `R${nextRoleId.toString().padStart(3, "0")}`,  
    });

    if (idgen) {
      await Idgen.update(
        { maxval: nextRoleId },
        { where: { idname: "roles" } }
      );
    }

    return res.status(200).json({
      isSuccess: true,
      message: "Role created successfully",
      data: newRole,
    });
  } catch (ex: any) {
    console.log(ex);
    return res.status(400).json({
      isSuccess: false,
      message: "Role not created",
      data: ex.errors,
    });
  }
};

export const updateRoles:RequestHandler=async(req,res,next)=>{
  try{
    console.log("data",req.body.data)

    const {role_id}=req.body.data.role_id;
    
    console.log("id",role_id)
    
    await Role.update(req.body.data,{where:{role_id:req.body.data.role_id}});

    
    const updatedRole:Role|null=await Role.findByPk(role_id)
    return res.status(200).json({
      isSuccess: true,
           message: "User updated successfully",
       data: updatedRole,
    })

  }
  catch (ex: any) {
    console.log(ex)
        return res
          .status(400)
          .json({ isSuccess: false, message: "", data: ex.errors });
      }
}


export const getRoleById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const role = await Role.findByPk(id);

    if (role) {
      return res.status(200).json({
        isSuccess: true,
        message: "Role details by ID",
        data: role,
      });
    } else {
      return res.status(404).json({
        isSuccess: false,
        message: "Role not found",
        data: null,
      });
    }
  } catch (ex: any) {
    return res.status(500).json({
      isSuccess: false,
      message: "Error fetching role details by ID",
      data: ex.errors,
    });
  }
};

export const updateRoleStatus: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const role = await Role.findOne({
      where: {
        role_id: id,
      },
    });

    if (!role) {
      return res.status(404).json({
        isSuccess: false,
        message: "Role not found",
        data: null,
      });
    }

    await Role.update({ status: 0, updated_on: new Date() }, { where: { role_id: id } });

    const updatedRole = await Role.findByPk(id);

    return res.status(200).json({
      isSuccess: true,
      message: "Role status updated to zero successfully",
      data: updatedRole,
    });
  } catch (ex: any) {
    return res.status(500).json({
      isSuccess: false,
      message: "Error updating role status",
      data: ex.errors,
    });
  }
};

