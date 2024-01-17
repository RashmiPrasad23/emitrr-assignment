import mongoose from 'mongoose'
const questionSchema=new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language'
    },
    incorrectOptions: [{
        type: String,
        required: true,
        default: null
    }],
    correctAnswer: {
        type: String,
        required: true,
        default: null
    },
    
},{timestamps:true})

export const Question=mongoose.model('Question',questionSchema)