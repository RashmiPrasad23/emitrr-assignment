const mongoose = require('mongoose');

// setting up db connection
const connectDB=async()=>{
    try{
      // mongodb url for connection from env file
      const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URL}`)

      //logging successful and error message as per the circumstances
      console.log(`MongoDB connected!! DB HOST:${connectionInstance.connection.host}`);
    }catch(error){
        console.log("mongodb connection error");
        process.exit(1)
    }
}

module.exports=connectDB



// mongoose.connect('mongodb+srv://rashmi:LeHu1UOB8DxF8YPy@cluster0.vvkaakh.mongodb.net/');

// const db = mongoose.connection;

// db.on('Error', console.error.bind(console, 'Error in connecting to MongoDB'));

// db.once('open', () => {
//     console.log('Connected to Mongodb');
// })

// module.exports = db;

