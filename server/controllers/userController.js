const  User  = require("../models/userModel.js")
const asyncHandler=require("../utils/asyncHandler.js")
const ApiError=require("../utils/ApiError.js")
const ApiResponse=require("../utils/ApiResponse.js")
const jwt=require('jsonwebtoken')
const  QuizResult = require("../models/testResultModel.js")


//handler for generating access and refresh tokens whenver needed
const generateAccessAndRefreshTokens=async(userId)=>{
    try{
       // Find the user in the database using the provided user ID
       const user=await User.findById(userId)

       // Generate an access token using the user's information
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

const refreshAccessToken = asyncHandler(async (req, res) => {
  // Extract refresh token from cookies or request body
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  // Check if refresh token is missing
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    // Verify the incoming refresh token using the secret
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // Find the user associated with the decoded token and exclude the password
    const user = await User.findById(decodedToken?._id).select("-password");

    // Check if user or refresh token is missing
    if (!user || !incomingRefreshToken) {
      throw new ApiError(401, "Invalid refresh token");
    }

    // Check if the incoming refresh token matches the stored refresh token for the user
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or invalid");
    }

    // Set options for cookies (e.g., httpOnly, secure)
    const options = {
      httpOnly: true,
      secure: true,
    };

    // Generate new access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    // Return success response with updated tokens in cookies and JSON payload
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user, accessToken, refreshToken: refreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    // Handle token verification errors
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});




//language preference selection

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

//resetting the progress when the user wants
const patchResetProgress=asyncHandler(async(req,res)=>{ 
  try{
    const decodedToken=jwt.verify(
      req.cookies.accessToken,
      process.env.ACCESS_TOKEN_SECRET
     )
     const user=await User.findById(decodedToken?._id)
     const result = await User.findOneAndUpdate(
      {
        _id: decodedToken?._id,
        'pointsData.language': user.languagePref
      },
      {
        $set: {
          'pointsData.$.totalPoints': 0,
          'pointsData.$.pointsObtained': 0
        }
      }, 
    );
   
    return res
    .status(200) 
    .json(
        new ApiResponse(
            // status code
            200,
            // data
            null,
            // message
            "Reset successfully"
        )
      )
  }catch(e){
    return res
    .status(500) 
    .json(
        new ApiResponse(
            // status code
            500,
            // data
            null,
            // message
            "Error Occoured! Make sure you are logged in."
        )
      )
  }
})


const getSeriesChart=asyncHandler(async(req,res)=>{ 
  try{
    const decodedToken=jwt.verify(
      req.cookies.accessToken,
      process.env.ACCESS_TOKEN_SECRET
     ) 
  
    // Step 1: Fetch all documents with non-null 'category' and 'totalPoints'
    const user = await User.findById(decodedToken?._id)
    // Step 1: Fetch all documents with non-null 'language' and 'pointsObtained'
    const documents = user.pointsData.filter((point) => point.language && point.pointsObtained !== null);
// console.log("doc", documents)
    // Step 2: Process the documents to get unique languages and sum pointsObtained
    const languageMap = new Map();
    documents.forEach((doc) => {
      const { language, pointsObtained } = doc;
      if (languageMap.has(language)) {
        languageMap.set(language, languageMap.get(language) + pointsObtained);
      } else {
        languageMap.set(language, pointsObtained);
      }
    });
    // Step 3: Create the result object
    const labels = Array.from(languageMap.keys());
    const counts = Array.from(languageMap.values());

    const result = {
      labels: labels,
      data: counts
    };

    // console.log(result);
   
    return res
    .status(200) 
    .json(
        new ApiResponse(
            // status code
            200,
            // data
            result,
            // message
            "Reset successfully"
        )
      )
    }catch(e){
      return res
      .status(500) 
      .json(
          new ApiResponse(
              // status code
              500,
              // data
              null,
              // message
              "Error Occoured! Make sure you are logged in."
          )
        )
    }
})

module.exports={registerUser,loginUser,logoutUser,refreshAccessToken,updateLangPref,patchResetProgress,getSeriesChart}