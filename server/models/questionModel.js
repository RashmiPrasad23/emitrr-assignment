//question model

const mongoose = require('mongoose');
const questionSchema=new mongoose.Schema({
    question: {
        required: true,
        type: String
    },
    category: {
        type: String,
        required:true
    },
    options: [{
        type: String,
        required: true,
        default: null
    }],
    correctAnswer: {
        type: String,
        required: true,
        default: null
    },
    difficulty: {
        type: Number,
        required: true,
        default: null
    },
    language: {
        type: String,
        required: true,
        default: null
    },
    
},{timestamps:true})

module.exports=mongoose.model('Question',questionSchema)