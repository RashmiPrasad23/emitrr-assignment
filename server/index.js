const express = require("express");
const app = express();
const connectDB = require('./config/mongoose');
const cors = require('cors');
const cookieParser=require('cookie-parser')

require('dotenv').config();

//setting cross origin
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

//json se data ko accept
app.use(express.json({limit:"16kb"}));

//accept data from url->
app.use(express.urlencoded({ extended: true,limit:"16kb" }));

//set n get cookie from browser
app.use(cookieParser());



// use assets(files like pdf,img store in server)
app.use(express.static('./assets'));

// use express router
app.use('/', require('./router'));

// run db and server together
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running at port: ${process.env.PORT}`);
    });
})
.catch((err)=>{console.log("mongodb connection failed",err);})