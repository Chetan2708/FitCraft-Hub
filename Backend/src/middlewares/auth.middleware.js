import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js"; 
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

const verifyJWT = asyncHandler(async (req, res, next) => {
    try{

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        //It was signed in the user model with the user id so decodedToken will have user._id
        const user = await User.findById(decodedToken?._id).select("-password ")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
     
        req.user = user;
        next()
    }
    catch(error){
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
export{
    verifyJWT
}