const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    return res.json('home');
})

//user router import
const userRouter =require('./routes/userRoutes.js')
//routes declaration
router.use("/api/v1/users",userRouter);
//user router import
const settingsRouter =require('./routes/settingsRoutes.js')
//routes declaration
router.use("/api/v1/settings",settingsRouter);

const quizRouter =require('./routes/quizRoutes.js')
//routes declaration
router.use("/api/v1/quiz",quizRouter);

module.exports = router;