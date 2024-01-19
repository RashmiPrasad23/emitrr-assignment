//test result model

const mongoose = require('mongoose');
const testResultSchema=new mongoose.Schema({
    userid: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        required: true,
        type: String, 
    },
    language: {
        type: String,
        default: null
    },
    category: {
        type: String,
        default: null
    },
    totalPoints: {
        type: Number,
        default: null
    },
    pointsObtained: {
        type: Number,
        default: null
    },
    questionsData: [{
        question: String,
        correctAnswer: String,
        choosenAnswer: String,
        result: String,
        options: Array,
        difficulty: Number,
        marks: Number,
    }],
    desc: String,
   
},
{timestamps:true})

module.exports=mongoose.model("QuizResult",testResultSchema);