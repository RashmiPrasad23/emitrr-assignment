const  Question = require("../models/questionModel.js")
const  User = require("../models/userModel.js")
const  QuizResult = require("../models/testResultModel.js")
const asyncHandler=require("../utils/asyncHandler.js")
const ApiError=require("../utils/ApiError.js")
const ApiResponse=require("../utils/ApiResponse.js")
const jwt=require('jsonwebtoken') 
const bcrypt=require('bcrypt')

//controllers for quiz section


//calculating total quiz points and adding to the array
const calTotalQuizPoints = async(data) =>{
  let totalPoints = 0;
  let pointsObtained = 0;
  data.map(single =>{ 
    if(single.difficulty){
      totalPoints += single.difficulty;
      pointsObtained += single.marks;
    }
  });

  return {totalPoints,pointsObtained}
}



//controller for getting all questions from db
const getAllQuestions=asyncHandler(async(req,res)=>{ 
  //  const decodedToken=jwt.verify(
  //   req.cookies.accessToken,
  //   process.env.ACCESS_TOKEN_SECRET
  //  )
   const questions=await Question.find() 
// returning response as per need
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

//controller for getting all the subtopics present in language
const getAllSeries=asyncHandler(async(req,res)=>{ 
  
  const decodedToken=jwt.verify(
    req.cookies.accessToken,
    process.env.ACCESS_TOKEN_SECRET
   )
   const user=await User.findById(decodedToken?._id)
   const {languagePref} = user;
 
  //finding all the different topics from particular language 
   const topics=await Question.find({language: languagePref}).distinct("category");
   // Fetch all objects for each distinct category
   const seriesData = await Promise.all(
    topics.map(async (rawcategory) => {
      const {category, language} = await Question.findOne({ language: languagePref, category: rawcategory });
      return {category,language} ;
    })
  );
 

  //logging response
  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      seriesData,
      "fetched successfully"
    )
  )
})

//controller for all series questions
const getSeriesQuestions=asyncHandler(async(req,res)=>{
  //  const seriesQuestion=await Question.find({language})
    const { language, category } = req.query;
    if (!language || !category) {
      return res.status(400).json({ success: false, error: "Language and category are required parameters." });
    }
 
    const seriesQuestions = await Question.find({ language, category })
  .sort({ difficulty: -1 })
  .exec();
    return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        seriesQuestions,
        "fetched successfully"
      )
    )
  
})


//controller for submission calculation
const postQuizSubmission=asyncHandler(async(req,res)=>{
  //     
  let body = req.body
  const decodedToken=jwt.verify(
    req.cookies.accessToken,
    process.env.ACCESS_TOKEN_SECRET
   ) 

   let {totalPoints,pointsObtained} = await  calTotalQuizPoints(body.data)
   

  let data = {
    userid: decodedToken?._id,
    title: `Quiz - ${body.category} - ${body.language}`,
    language:body.language,
    category:body.category,
    totalPoints:totalPoints,
    pointsObtained:pointsObtained,
    questionsData: body.data,
  }

 
  const result = new QuizResult(data) 
  await result.save()

  // update totalUser points or add new points
// First, try to add the language if it doesn't exist
const resultAddLanguage = await User.findOneAndUpdate(
  {
    _id: decodedToken?._id,
    'pointsData.language': { $ne: data.language }
  },
  {
    $addToSet: {
      pointsData: {
        language: data.language,
        totalPoints: data.totalPoints,
        pointsObtained: data.pointsObtained
      }
    }
  },
  {
    new: true
  }
);

// If language was added, resultAddLanguage will have the updated document
// If language already existed, resultAddLanguage will be null

// Second, if language already existed, increment the points
if (!resultAddLanguage) {
  const resultIncrementPoints = await User.findOneAndUpdate(
    {
      _id: decodedToken?._id,
      'pointsData.language': data.language
    },
    {
      $inc: {
        'pointsData.$.totalPoints': data.totalPoints,
        'pointsData.$.pointsObtained': data.pointsObtained
      }
    },
    {
      new: true
    }
  );

  // resultIncrementPoints will have the updated document
}

  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      data,
      "Test Submitted. Result will be process soon."
    )
  )

})

//getting top scorers in leaderboard according to languages


const getLeaderboard = asyncHandler(async (req, res) => {
  try {
    // Extract language preference from the request body if needed
    // const { languagePref } = req.body;

    // Fetch user data including usernames and pointsData from the database
    const usersPoints = await User.find().select("username pointsData");

    // Initialize an array to store points data with associated usernames
    let pointsWithUsername = [];

    // Iterate through each user
    usersPoints.forEach((singleUser) => {
      // Iterate through pointsData for each user
      singleUser.pointsData.forEach((pointsPerLang) => {
        // Create an object with relevant data for each user and language
        let dataObject = {
          userName: singleUser.username,
          totalPoints: pointsPerLang.pointsObtained,
          language: pointsPerLang.language
        };

        // Push the dataObject to the pointsWithUsername array
        pointsWithUsername.push(dataObject);
      });
    });

    // Respond with success and the aggregated points data
    res.status(200).json({
      success: true,
      data: pointsWithUsername,
      message: "Successfully fetched user points based on language",
    });
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});


module.exports={getAllQuestions,getAllSeries,getSeriesQuestions, postQuizSubmission, getLeaderboard}