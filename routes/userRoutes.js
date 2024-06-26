const express = require('express');
const userRouter = express.Router();

userRouter.use(express.urlencoded({extended:true}));

userRouter.use((req,res,next) => {
    
    req.app.set('views','./views/Users');
    next();

})

const userController = require('../controllers/userController')

userRouter.get('/',(req,res) => {
    res.send('This is user route')
})

//Registration
userRouter.get('/signup',userController.loadRegister)
userRouter.post('/signup',userController.gen_otp)
userRouter.post('/signup/verify-otp',userController.verifyOTP)

//Login
userRouter.get('/login',userController.loadLogin)
userRouter.post('/login',userController.loginUser)

module.exports = userRouter;