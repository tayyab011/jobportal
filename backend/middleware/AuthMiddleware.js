 import jwt from "jsonwebtoken";
import { JWT_EXPIRATION_TIME, JWT_KEY } from "../index.js";
const isAuthenticated =async (req,res,next)=>{

    try {
        const token =req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message :"user not authencitated ",
                success:false
            })
}
 const decode = await jwt.verify(token, JWT_KEY);

 if (!decode) {
    return res.status(401).json({
      message: "Invalid Token",
      success: false,
    });
 }
 req.id = decode.userId;
 next()
    } catch (error) {
        return {error: error.toString()}
    }
}

export default isAuthenticated 
/* import jwt from "jsonwebtoken";
import { JWT_EXPIRATION_TIME, JWT_KEY } from "../index.js";
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const decode = await jwt.verify(token, JWT_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    return { error: error.toString() };
  }
};

export default isAuthenticated; */