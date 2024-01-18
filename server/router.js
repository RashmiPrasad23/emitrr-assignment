const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    return res.json('home');
})

//user router import
const userRouter =require('./routes/userRoutes.js')
//routes declaration
router.use("/api/v1/users",userRouter);

module.exports = router;