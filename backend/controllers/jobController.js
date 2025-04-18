import { jobModel } from "../models/jobModel.js";

/*  export const postJob =async(req,res)=>{
try {
const {
  title,
  description,
  requirments,
  selary,
  experienceLevel,
  location,
  jobtype,
  position,
  company,
} = req.body;
const userId =req.id

if ( !title ||!description||!requirments||!selary||!experienceLevel||!location||!jobtype||!position||!company) {
    return res.status(400).json({
        success:false,
        message:"somthing is missing"
    })
}
const job = await jobModel.create({
  title,
  description,
  requirments: requirments.split(","),
  selary: Number(selary),
  experienceLevel,
  location,
  jobtype,
  position,
  company,
  created_by: userId,
});
    
return res.status(200).json({
  success: true,
  job,
  message: "New job created successfully.",
});
} catch (error) {
    return { error:error.toString()}
}
}  */
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      company,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experienceLevel ||
      !position ||
      !company
    ) {
      return res.status(400).json({
        message: "Somethin is missing.",
        success: false,
      });
    }
    const job = await jobModel.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel,
      position,
      company,
      created_by: userId,
    });
    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getallJob =async (req,res)=>{
    try {
      const keyword =  req.query.keyword || "";
      const query ={
        $or:[
            {title:{$regex:keyword,$options:"i"}},
            {description:{$regex:keyword,$options:"i"}},
        ]
      } 
  

    let jobs = await jobModel.find(query).populate({
      path: "company",
    }).sort({ createdAt: -1});
    if (!jobs) {
        return res.status(400).json({
          success: false,
          message: "Jobs not found",
        });
    }
      return res.status(200).json({
        jobs,
        success: true,
      });
    } catch (error) {
        return { error: error.toString(),message:"somthing went wrong"};
    }
}
 



export const getJobById = async (req, res) => {
  try {
     let jobId = req.params.id;
   let job = await jobModel.findById(jobId).populate({
     path: "applications",
   });
   if (!job) {
     return res.status(400).json({
       success: false,
       message: "Jobs not found",
     });
   }
    return res.status(200).json({
        job,
      success: true,
   
    });
  } catch (error) {
    return { error: error.toString(), message: "somthing went wrong" };
  }
};


export const getAdminsJob = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await jobModel.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    if (!jobs) {
      return res.status(400).json({
        success: false,
        message: "Jobs not found",
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    return { error: error.toString(), message: "somthing went wrong" };
  }
};