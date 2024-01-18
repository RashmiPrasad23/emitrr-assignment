const  User  = require("../models/userModel.js")
const asyncHandler=require("../utils/asyncHandler.js")
const ApiError=require("../utils/ApiError.js")
const ApiResponse=require("../utils/ApiResponse.js")
const jwt=require('jsonwebtoken')


const generateAccessAndRefreshTokens=async(userId)=>{
    try{
       const user=await User.findById(userId)
       const accessToken=user.generateAccessToken()
       const refreshToken=user.generateRefreshToken()

       user.refreshToken=refreshToken
       await user.save({validateBeforeSave:false})
       
       return {refreshToken,accessToken}



    }catch(error){
        throw new ApiError(500,"something went wrong while generating refresh and access token")
    }
}



const registerUser=asyncHandler(async(req,res)=>{ 
    //steps->get user details from frontend
    /*     ->validation(not empty )
           ->check if user already exists:username,email
           ->check for images
           ->create user object- create entry in db
           ->remove password and refresh token field from response
           ->check for user creation
           ->return response
    */

    //collecting all data from req.body
      const {fullName,email,username,password}=req.body
  

    //   if(fullName===""){
    //     throw new ApiError(400,"fullname is required")
    //   }

    //check for details if empty
      if(
        [fullName,email,username,password].some((field)=>field?.trim()==="")
      ){
         throw new ApiError(400,"all fields are required")
      }

      //check if user already exists
      const existedUser=await User.findOne({
        $or:[{username},{email}]
      })
      if(existedUser){
        throw new ApiError(409,"user with email or username already exists")
      }

     //obj create
      const user=await User.create({
        fullName,
        email,
        password,
        username
      })
      
      //remove password n refreshtoken
      const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
      )

      //if user not created throw error
      if(!createdUser){
        throw new ApiError(500,"something went wrong while registering the user")
      }
      
      //if all ok ,return response
      return res.status(201).json(
        new ApiResponse(200,createdUser,"user registered successfully")
      )

})

const loginUser=asyncHandler(async(req,res)=>{
      /* steps-> req body->data
              -> username or email(access)
              ->find the user
              ->if password check
                 ->access and refresh token generate
              ->send cookies
      */

              const {email,username,password}=req.body

              if(!(username || email)){
                throw new ApiError(400,"username or password is required")
              }

              const user=await User.findOne({
                $or: [{username},{email}]
              })
              if(!user){
                throw new ApiError(404,"user does not exist")
            }
            
            const isPasswordValid=await user.isPasswordCorrect(password)
            if(!isPasswordValid){
                throw new ApiError(401,"invalid user credential")
            }
            
            const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id)
            
            const loggedInUser= await User.findById(user._id).select("-password -refreshToken")
            
            const options={
                httpOnly:true,
                secure:true
            }
            
            return res
            .status(200)
            .cookie("accessToken",accessToken,options)
            .cookie("refreshToken",refreshToken,options)
            .json(
                new ApiResponse(
                    // status code
                    200,
                    // data
                    {
                        user:loggedInUser,accessToken,refreshToken
                    },
                    // message
                    "user logged in successfully"
                )
              )
})

const logoutUser=asyncHandler(async(req,res)=>{
    //middleware->jaane se phle mil kr jaayeyga
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )

    const options={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"user logged out"))

})

const refreshAccessToken=asyncHandler(async(req,res)=>{
   const incomingRefreshToken= req.cookies.refreshToken||req.body.refreshToken
 
   if(!incomingRefreshToken){
    throw new ApiError(401,"unauthorised request")
   }

  try {
     const decodedToken=jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
     )
     const user=await User.findById(decodedToken?._id).select("-password")
 
     if(!incomingRefreshToken){
      throw new ApiError(401,"invalid refresh token")
     }
  
     if(incomingRefreshToken !== user?.refreshToken){
      throw new ApiError(401,"refresh token is expiredor use")
     }
  
      const options={
          httpOnly:true,
          secure:true
      }
  
      const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id)
    
      return res
      .status(200)
      .cookie("accessToken",accessToken,options)
      .cookie("refreshToken",refreshToken,options)
      .json(
          new ApiResponse(
              200,
              {user,accessToken,refreshToken:refreshToken},
              "access token refreshed"
          )
      )
  } catch (error) {
    throw new ApiError(401,error?.message||"invalid refresh token")
  } 
})

const updateLangPref=asyncHandler(async(req,res)=>{ 
  const decodedToken=jwt.verify(
    req.cookies.accessToken,
    process.env.ACCESS_TOKEN_SECRET
   )
  await User.findByIdAndUpdate(
    decodedToken?._id,
      {
          $set:{
            languagePref:req.body.languagePref
          }
      },
      {
          new:true
      }
  )



  return res
  .status(200) 
  .json(new ApiResponse(200,{},"Updated"))

})

module.exports={registerUser,loginUser,logoutUser,refreshAccessToken,updateLangPref}