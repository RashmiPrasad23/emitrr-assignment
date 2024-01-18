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

module.exports=mongoose.model('Question',questionSchema)