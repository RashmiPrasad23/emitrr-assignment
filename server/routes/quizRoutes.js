//routes for quiz conduction

const express = require("express")
const verifyJWT=require("../middlewares/authMiddleware.js")
const{getAllQuestions,getAllSeries,getSeriesQuestions, postQuizSubmission, getLeaderboard} =require("../controllers/quizController.js")


const quizRouter=express.Router()

quizRouter.route("/getAllQuestion").get(getAllQuestions) 

quizRouter.route("/getAllSeries").get(getAllSeries)

quizRouter.route("/getSeriesQuestions").get(getSeriesQuestions)

quizRouter.route("/postQuizSubmission").post(postQuizSubmission)

quizRouter.route("/getLeaderboard").get(getLeaderboard)


module.exports=quizRouter