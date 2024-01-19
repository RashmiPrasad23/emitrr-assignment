//user model

const mongoose = require('mongoose');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

const Schema = mongoose.Schema;
const userSchema = new Schema({
    fullName: {
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        index:true //searchable more
    },
    password: {
        type: String,
        required: [true,'password is required']
    },
    role: {
        type: Number,
        default: 0
    },
    profileImage: {
        type: String,
        default: null
    },
    refreshToken:{
        type:String
    },
    languagePref:{
        type:String,
        default:null
    },
    pointsData:[
    {
        language: String,
        totalPoints: Number,
        pointsObtained: Number,
    }
    ]
    
    
}, {
    timestamps: true
});


//hashing the password
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next;

    this.password=await bcrypt.hash(this.password,10)
    next()
})

//comparing the password between input and stored password
userSchema.methods.isPasswordCorrect=async function(password){
   return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function(){
   return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

module.exports = mongoose.model('User', userSchema);