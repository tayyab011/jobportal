import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { JWT_EXPIRATION_TIME, JWT_KEY } from "../index.js";
import getDataUri from "../utility/datauri.js";
import cloudinary from './../utility/cloudinary.js';


export const register =async(req,res)=>{
try {
    const { fullname, email, phoneNumber, password,role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
        return res.status(401).json({
            message:"Please Fill all the Data",
            success:false
        })
    }
    const file =req.file;
    const fileUri=getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await userModel.findOne({email})
    if (user) {
        return res.status(401).json({
          message: "User Exists",
          success: false,
        });
    }
    const hashedPassword =await bcrypt.hash(password,8)
    await userModel.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
       profile: {
            profilePhoto: cloudResponse.secure_url
          }
    });
     res.status(200).json({
       message: `Account Created Successfully`,
       success: true,
     });
} catch (error) {
     return { error: error.toString() };
}
}


export const login = async (req, res) => {
  try {
    let { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Please Fill all the Data",
        success: false,
      });
    }

    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "incorrect email. Plz register first",
        success: false,
      });
    }
   /*  console.log(user); */
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }
    //check role is correct or not
    if (role != user.role) {
      return res.status(400).json({
        message: "incorrect role",
        success: false,
      });
    }
   
    const tokenData={
    userId :user._id
   
    }
const token = jwt.sign(tokenData, JWT_KEY,{expiresIn:"1d"});

/* eikhane  expires in 1d eivabeii dite hobe naile error mare */
  let options = {
    maxAge: 30 * 24 * 60 * 60 * 1000, 
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
  };


   user = {
     _id: user._id,
     fullname: user.fullname,
     email: user.email,
     phoneNumber: user.phoneNumber,
     role: user.role,
     profile: user.profile,
   };

   return res
     .status(200)
     .cookie("token", token, options)
     .json({
       message: `Welcome back ${user.fullname}`,
       user,
       success: true,
     });




} catch (error) {
    return { error: error.toString() };
  }
}




export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
 res.status(200).json({
   message: "Logout Successfully",
   success: true,
 });
/*  res.status(200).cookie("token", "", { maxAge :0}).json({
      message:"Logout Successfully",
      success:true
    }) */
  } catch (error) {
    return { error: error.toString() };
  }
};


  export const updateProfile = async (req, res) => {
  try {
     const { fullname, email, phoneNumber, bio, skills } = req.body;
   
     const file = req.file;
     const fileUri = getDataUri(file)
    
     const cloudResponse= await cloudinary.uploader.upload(fileUri.content,{
  resource_type: "raw", // 🚀 Required for PDFs
  // (Optional) Store in a specific folder
})
      let skillsArray ;
  if (skills) {
    skillsArray = skills
      .replace(/\s+/g, " ") // Replace multiple spaces with a single space
      .trim() // Remove leading/trailing spaces
      .split(" "); // Split by a single space
  }

      const userId = req.id;
      
      let user = await userModel.findById(userId);
      if(!user){
return res.status(400).json({
  message: "User Not Found",
  success: false,
});
 }
 if (fullname) user.fullname = fullname;
 if (email) user.email = email;
 if (phoneNumber) user.phoneNumber = phoneNumber;
 if (bio) user.profile.bio = bio;
 if (skills) user.profile.skills = skillsArray;

 if (cloudResponse) {
  user.profile.resume = cloudResponse.secure_url;
  user.profile.resumeOriginalName = file.originalname;  //save the original file name
 } //save cloudinaryurl


 await user.save()

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
return res.status(200).json({
  message: "User Updated successfully",
  user,
  success: true,
});
  } catch (error) {
    return { error: error.toString() };
  }
}; 


 /*  export const updateProfile = async (req, res) => {
  try {
        let reqbody = req.body;
    
         const file = req.file;
          if (reqbody.skills) {
            reqbody.skills = reqbody.skills.split(",");
          }
         if (reqbody.password) {
      reqbody.password = await bcrypt.hash(reqbody.password, 8);
           }
     
      let data =  await userModel.updateOne(reqbody);

return res.status(200).json({
  message: "User Updated successfully",
  user: data,
  success: true,
});
  } catch (error) {
    return { error: error.toString() };
  }
};   */