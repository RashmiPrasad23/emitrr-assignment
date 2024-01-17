import mongoose from 'mongoose'
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

export const TestResultSchema=mongoose.model("TestResultSchema",testResultSchema);