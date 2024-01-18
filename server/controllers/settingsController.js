const  User  = require("../models/userModel.js")
const asyncHandler=require("../utils/asyncHandler.js")
const ApiError=require("../utils/ApiError.js")
const ApiResponse=require("../utils/ApiResponse.js")
const jwt=require('jsonwebtoken') 
const bcrypt=require('bcrypt')

const getUserDetails=asyncHandler(async(req,res)=>{ 
   const decodedToken=jwt.verify(
    req.cookies.accessToken,
    process.env.ACCESS_TOKEN_SECRET
   )
   const user=await User.findById(decodedToken?._id)
   const {fullName, email, username} = user;

  return res
  .status(200) 
  .json(
      new ApiResponse(
          // status code
          200,
          // data
          {fullName, email, username},
          // message
          "User Details fetched successfully"
      )
    )
})

const putUserDetails=asyncHandler(async(req,res)=>{ 
  // only auth person can change the value
   const decodedToken=jwt.verify(
    req.cookies.accessToken,
    process.env.ACCESS_TOKEN_SECRET
   )

   let data  = req.body
   if(data.password){
    data.password=await bcrypt.hash(data.password,10)
   } 

   const user = await User.findOneAndUpdate(
    { _id: decodedToken?._id },
    { $set:  data  }
  );

  console.log(user)

  return res
  .status(200) 
  .json(
      new ApiResponse(
          // status code
          200,
          // data
          null,
          // {fullName, email, username},
          // message
          "Details Updated Successfully"
      )
    )
})
 

module.exports={getUserDetails,putUserDetails}