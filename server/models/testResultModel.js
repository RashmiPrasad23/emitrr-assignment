const mongoose = require('mongoose');
const testResultSchema=new mongoose.Schema({
    title: {
        required: true,
        type: String,
        unique: true
    },
    LanguageCategory: {
        type: String,
        default: null
    },
    desc: String,
   
},
{timestamps:true})

module.exports=mongoose.model("TestResultSchema",testResultSchema);