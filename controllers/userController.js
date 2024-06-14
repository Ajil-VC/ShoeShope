const {User,OTP} = require('../models/models')
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const {appPassword} = require('../config/config')
const nodemailer = require('nodemailer')

const securePassword = async (password) => {
    
    try{

        const hashedP = await bcrypt.hash(password,10);
        return hashedP;

    }catch(error){
        console.log(error)
    }

}

const loadRegister = async(req,res) => {

    try{

        res.render('registration')

    }catch(error){
        console.log('something happened')
    }
}

//OTP Generating here
//************************************* */
const gen_otp = async(req,res) => {

    req.session.formdata = {...req.body}
    console.log(req.session.formdata)
    const {email} = {...req.body}

   
    const otp = otpGenerator.generate(4,{digits:true,alphabets:false,upperCaseAlphabets:false,specialChars:false})
    try{

        await OTP.create({email,otp})

        //Sending OTP to the email
        const transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : 'fullstackdevelopersince2024@gmail.com',
                pass : appPassword
            }
        });
        transporter.sendMail({
            from : "fullstackdevelopersince2024@gmail.com",
            to : email,
            subject : "OTP Verification",
            text : `Your OTP for verification is ${otp}`
        });

        res.status(200).render('otpVerification');
        
    }catch(error){
        console.log(error);
        res.status(500).send("Error sending OTP")
    }
}

//OTP verification here
//************************************* */
const verifyOTP = async(req,res) => {

    /*Consistency with Promises: When using async/await syntax, .exec()
        ensures that the query returns a promise. This can be more consistent and predictable,
        particularly when integrating with other promise-based code.*/
        res.render('otpVerification')
    console.log(req.body)
}

const insertUser = async(req,res) => {

    const sPassword = await securePassword(req.body.password)

    try{
        const newUser = new User({
            firstName   : req.body.firstName,
            lastName    : req.body.lastName,
            email       : req.body.email,
            mobile_no   : req.body.mobile_no,
            password    : sPassword  
        })

        
        const userData = await newUser.save();

        if(userData){
            res.send('Success')
        }else{
            res.send('paali')
        }
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    loadRegister,
    insertUser,
    gen_otp,
    gen_otp,
    verifyOTP
}