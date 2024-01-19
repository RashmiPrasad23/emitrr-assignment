// settings routes

const express = require("express")
const verifyJWT=require("../middlewares/authMiddleware.js")
const{getUserDetails,putUserDetails} =require("../controllers/settingsController.js")

const settingsRouter=express.Router()

settingsRouter.route("/getUserDetails").get(getUserDetails) 
settingsRouter.route("/putUserDetails").patch(putUserDetails) 



module.exports=settingsRouter