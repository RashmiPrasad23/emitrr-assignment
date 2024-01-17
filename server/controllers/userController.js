const  User  = require("../models/userModel.js")
const asyncHandler=require("../utils/asyncHandler.js")

const registerUser=asyncHandler(async(req,res)=>{
    console.log(req.body)
    const userdata = new User(req.body)
    userdata.save();
    res.status(200).json({
        message:'ok'
    })
})

module.exports=registerUser