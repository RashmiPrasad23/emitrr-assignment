import mongoose from 'mongoose'
const languageSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    LanguageId: {
        type: String,
        default: null
    },
    desc: String,

},{timestamps:true})

module.exports=mongoose.model('Language',languageSchema)