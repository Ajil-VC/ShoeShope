const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },
    address : {
        type : Array
    },

    mobile_no:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Number,
        default:0
    },
    isAuthorised:{
        type:Number,
        default:0
    },
    isBlocked:{
        type:Number,
        default:0
    },
    image:{
        type:String,
    }

});

const otpSchema = new mongoose.Schema({
    email: {type:String , required : true},
    otp: {type:String , required : true},
    createdAt: { type: Date, expires: '1m', default: Date.now }
});

const User = mongoose.model('User', userSchema);
const OTP = mongoose.model('OTP',otpSchema) 

module.exports = {
    User,
    OTP
}