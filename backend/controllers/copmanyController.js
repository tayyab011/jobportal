
import { companyModel } from './../models/companyModel.js';
import mongoose from "mongoose";
import getDataUri from './../utility/datauri.js';
import cloudinary from './../utility/cloudinary.js';

export const registerCompany =async (req,res)=>{
    try {
        const { companyName } = req.body;
      
        if (!companyName) {
          return res.status(401).json({
            success: false,
            message: "Company name is  Required",
          });
        }
     let company = await companyModel.findOne({name:companyName});
   

     if (company) {
        return res.status(401).json({
          success: false,
          message: "same company",
        });
     }
  company = await companyModel.create({
    name: companyName,
    userId: req.id
  });

  if (company) {
    return res.status(200).json({
      message: " Company  Created Successfully ",
      company,
      success: true,
    });
  }
    } catch (error) {
         return { error: error.toString() };
    }
}


export const getCompany = async (req, res) => {
  try {
   const userId = req.id;
   let companies = await companyModel.find({userId});
   
   if (!companies) {
     return res.status(400).json({
       message: "companies not found",
       success: false,
     });
   }
   return res.status(200).json({
     success:true,
     companies,
   })
  } catch (error) {
    return { error: error.toString() };
  }
};

export const getCompanyId = async (req, res) => {
  try {
    const companyId = req.params.id;
    let company = await companyModel.findById(companyId );

    if (!company) {
      return res.status(400).json({
        message: "companies not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "companies found",
      company,
      success: true,
    });
  } catch (error) {
    return { error: error.toString() };
  }
};


export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location} = req.body;
    let company = await companyModel.findOne({ name});

   /*  if (company) {
      return res.status(401).json({
        success: false,
        message: "same company",
      });
    } */
    const file=req.file;
    const fileUri =getDataUri(file)
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url
    const updateData = { name, description, website, location, logo };
    company= await companyModel.findByIdAndUpdate(req.params.id,updateData);
   if (!company) {
     return res.status(400).json({
       message: "companie not found",
       success: false,
     });
   }
    return res.status(200).json({
      message: "companie Information updated successfully",
      company,
      success: true,
    });
  } catch (error) {
    return { error: error.toString() };
  }
};