import { RequestHandler } from "express";
import { User } from "../model/users.model";
import { Role } from "../model/role.model";
import { Language } from "../model/language.model";
import { Currency } from "../model/currencies.model";
import { State } from "../model/states.model";
import { Country } from "../model/countries.model";


export const getAllUsers:RequestHandler=async(req,res,next)=>{
    try{
       const usersDetails=await User.findAll({
        include: [
            
            {
              model: Role,
              attributes: ['role_id', 'name'], 
            },
            {
                model: Country,
                attributes: ['country_id', 'country_name','phone_code'],
                
              },

              {
                model: State,
                attributes: ['state_id', 'state_name'],
              },
              {
                model: Language,
                attributes: ['language_id', 'language_name'],
              },
            //   {
            //     model: Currency,
            //     attributes: ['currency_id', ' currency_name'],
            //   }

          ],
       });

       const responseData = {
        isSuccess: true,
        message: "operation details get successfully",
        data: usersDetails,
      };
      return res.status(200).json(responseData)
}catch (ex: any) {
    console.log(ex)
  return res.status(400).json({
    isSuccess: false,
    message: "Users details not get",
    data: ex.errors,
  });
}
}
export const createUser:RequestHandler=async (req, res,next) => {
    try {
      const userData = req.body; 
  
      const newUser = await User.create(userData);
  
      return res.status(201).json({
        isSuccess: true,
        message: 'User created successfully',
        data: newUser,
      });
    } catch (ex: any) {
      console.error(ex);
      return res.status(500).json({
        isSuccess: false,
        message: 'Error creating user',
        error: ex.message,
      });
    }
  };