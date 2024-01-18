const  Question = require("../models/questionModel.js")
const asyncHandler=require("../utils/asyncHandler.js")
const ApiError=require("../utils/ApiError.js")
const ApiResponse=require("../utils/ApiResponse.js")
const jwt=require('jsonwebtoken') 
const bcrypt=require('bcrypt')

const getAllQuestions=asyncHandler(async(req,res)=>{ 
  //  const decodedToken=jwt.verify(
  //   req.cookies.accessToken,
  //   process.env.ACCESS_TOKEN_SECRET
  //  )
   const questions=await Question.find() 

  return res
  .status(200) 
  .json(
      new ApiResponse(
          // status code
          200,
          // data
          questions,
          // message
          "fetched successfully"
      )
    )
})


module.exports={getAllQuestions}