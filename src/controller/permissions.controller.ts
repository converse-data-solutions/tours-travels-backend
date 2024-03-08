import { RequestHandler } from "express";
import { Permission } from "../model/permission.model";
import { Operation } from "../model/operation.model";
import { Role } from "../model/role.model";
import {Idgen} from "../model/idgen.model";
import sequelize from "sequelize";
export const getAllPermissions: RequestHandler = async (req, res, next) => {
    try {
      const permissionList = await Permission.findAll({
        include: [
          {
            model: Operation,
            attributes: ['operation_id', 'operation'],
          },
          {
            model: Role,
            attributes: ['role_id', 'name'], 
          },
        ],
      });
  
      const responseData = {
        isSuccess: true,
        message: "Permission details get successfully",
        data: permissionList,
      };
  
      return res.status(200).json(responseData);
    } catch (ex: any) {
        console.log(ex)
      return res.status(400).json({
        isSuccess: false,
        message: "Permission details not get",
        data: ex.errors,
      });
    }
  };

  export const getPermissionById:RequestHandler=async(req,res,next)=>{
    try {
      console.log("req",req.body)
      const { role_id } = req.body;


      if (!role_id) {
        console.log("id not get pass")
        return res.status(400).json({
          isSuccess: false,
          message: "Role ID is required",
          data: null,
        });
      }
  
      const permissionList = await Permission.findAll({
        include: [
          {
            model: Operation,
            attributes: ['operation_id', 'operation'],
          },
          {
            model: Role,
            attributes: ['role_id', 'name'],
            where: { role_id: role_id }, 
          },
        ],
      });
  
      const responseData = {
        isSuccess: true,
        message: "Permission details get successfully",
        data: permissionList,
      };
  
      return res.status(200).json(responseData);
    } catch (ex: any) {
      console.log("error:",ex);
      return res.status(400).json({
        isSuccess: false,
        message: "Permission details not get",
        data: ex.errors,
      });
    }
  };

  export const createPermission: RequestHandler = async (req, res, next) => {
    console.log("request",req.body)
    try {
      console.log("request", req.body);
      const idgen = await Idgen.findOne({
        where: {
          idname: "permissions",
        },
        attributes: [
          [sequelize.fn("MAX", sequelize.col("maxval")), "maxval"],
        ],
      });
  
      let nextPermissionId = idgen ? idgen.get("maxval") + 1 : 1;
      const newPermissions = [];
  
      for (const permissionData of req.body) {
        try {
          const existingPermission = await Permission.findOne({
            where: {
              role_id: permissionData.role_id,
              operation_id: permissionData.operation_id,
            },
          });
  
          if (existingPermission) {
            console.log("Updating existing permission:", permissionData);
            await existingPermission.update({
              status: permissionData.status,
            });
            newPermissions.push(existingPermission);
          } else {
            console.log("Creating new permission:", permissionData);
            const newPermission = await Permission.create({
              ...permissionData,
              role_id: permissionData.role_id,
              permission_id: `PR${nextPermissionId.toString().padStart(5, "0")}`,
              effective_from: new Date(),
            });
  
            newPermissions.push(newPermission);
            nextPermissionId++;
          }
        } catch (error) {
          console.log("Error creating/updating permission:", error);
          
        }
      }
      if (idgen) {
        await Idgen.update(
          { maxval: nextPermissionId },
          { where: { idname: "permissions" } }
        );
      }
  
      return res.status(200).json({
        isSuccess: true,
        message: "Permission created successfully",
        data: newPermissions,
      });
    } catch (ex: any) {
      console.log("error", ex);
      return res.status(400).json({
        isSuccess: false,
        message: "Permission not created",
        data: ex.errors,
      });
    }
  };
  
  export const updatePermissionStatus:RequestHandler=async(req,res,next)=>{
    const id =req.params;
    console.log("id",id.id);
    console.log("idreq",req.body.data)

    try{
      console.log("id2",id.id)

      const permission = await Permission.findOne({
        where: {
          permission_id: req.body.data,
        },
      });
  
      if (!permission) {
        return res.status(404).json({
          isSuccess: false,
          message: "Permission not found",
          data: null,
        });
      }
      console.log('step 1');
  
      await Permission.update({ status: 0, updated_on: new Date() }, { where: { permission_id: req.body.data } });
  
      const updatedPermission = await Permission.findByPk(req.body.data);
  
      console.log('step 2');

      return res.status(200).json({
        isSuccess: true,
        message: "Role status updated to zero successfully",
        data: updatedPermission,
      });

    }catch(ex: any) {
      console.log(ex)
    return res.status(400).json({
      isSuccess: false,
      message: "Permission details not get",
      data: ex.errors,
    });
  }
  }