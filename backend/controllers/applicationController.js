import { applicationModel } from './../models/applicationModel.js';


import { jobModel } from '../models/jobModel.js';



export const applyJob =async(req,res)=>{
   try {
     const userId = req.id;
     const jobId = req.params.id;
     if (!jobId) {
       return res.status(400).json({
         message: "job id required",
         success: false,
       });
     }
     const existingApplication = await applicationModel.findOne({
       job: jobId,
       applicant: userId,
     });
     if (existingApplication) {
       return res.status(400).json({
         success: false,
         message: "you are already  applied for this job",
       });
     }
     const job = await jobModel.findById(jobId);
     if (!job) {
       return res.status(400).json({
         message: "job not found",
         success: false,
       });
     }
     const newApplication = await applicationModel.create({
       job: jobId,
       applicant: userId,
     });
     
     job.applications.push(newApplication._id);
     await job.save();
     return res.status(200).json({
       message: "job applied successfully",
       success: true,
     });
   } catch (error) {
    return { error: error.toString()};
   }
}




export const getApplyJobs = async (req, res) => {
  try {
    const userId = req.id;
const application = await applicationModel
  .find({ applicant: userId })
  .sort({ createdAt: -1 })
  .populate({
    path: "job",
    options: { sort: { createdAt: -1 } },
    populate: {
      path: "company",
      options: { sort: { createdAt: -1 } },
    },
  });
   
if (!application) {
  return res.status(400).json({
    message: "no application found",
    success: false,
  });

}
  return res.status(200).json({
    application,
    success: true,
  });
  } catch (error) {
    return { error: error.toString() };
  }
};

/* admin see how many user apply */
export const getApplicents =async(req,res) => {
    /* try {
        const jobId =req.params.id;
 const job = await jobModel.findById(jobId).populate({
   path: "applications",
   options: { sort: { createdAt: -1 } },
   populate: {
     path: "applicant",
   },
 });
   if (!job) {
         return res.status(400).json({
           message:"job not found",
           success: false,
         });
   }
    return res.status(200).json({
      job,
      success: true,
    });
    } catch (error) {
            return { error: error.toString() };
    } */

 try {
   const jobId = req.params.id;
   const job = await jobModel.findById(jobId).populate({
     path: "applications",
     options: { sort: { createdAt: -1 } },
     populate: {
       path: "applicant",
     },
   });
   if (!job) {
     return res.status(404).json({
       message: "Job not found.",
       success: false,
     });
   }
   return res.status(200).json({
     job,
     succees: true,
   });
 } catch (error) {
   console.log(error);
 }

          }









          
/*  export const UpdateStatus = async (req, res) => {
  try {
    const {status} = req.body;    eikhane 2nd brac na dewate 4 din error khasi 
   const applicationId =req.params.id;
   if (!status) {
        return res.status(400).json({
          message:"status is required",
          success: false,
        });
   }
   const application = await applicationModel.findOne({ _id: applicationId });
   if (!application) {
     return res.status(400).json({
       message: "application is not found",
       success: false,
     });
   }
   application.status =status.toLowerCase();
   await application.save();
   return res.status(400).json({
     message: "status updated successfully",
     success: true,
   });
  } catch (error) {
    return { error: error.toString() };
  }
}; 
 */



  export const UpdateStatus = async (req, res) => {
  try {
    const reqbody = req.body;    
   const applicationId =req.params.id;
  
   const application = await applicationModel.findOne({ _id: applicationId });
   if (!application) {
     return res.status(400).json({
       message: "Application is not Found",
       success: false,
     });
   }
   
  const status = await applicationModel.updateOne({ _id: applicationId }, { $set: reqbody });
  
   return res.status(200).json({
    status,
     message: "Status Updated Successfully",
     success: true,
   });
  } catch (error) {
    return { error: error.toString() };
  }
}; 
 

