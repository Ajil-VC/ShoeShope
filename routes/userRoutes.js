const express = require('express');
const userRouter = express.Router();

userRouter.use(express.urlencoded({extended:true}));

const userController = require('../controllers/userController')

userRouter.get('/',(req,res) => {
    res.send('This is user route')
})

//Registration
userRouter.get('/signup',userController.loadRegister)
userRouter.post('/signup',userController.gen_otp)
userRouter.post('/verify-otp',userController.verifyOTP)
// onclick="window.location.href='/verify-otp'  USE THIS LINE IN OTP BTN"
module.exports = userRouter;