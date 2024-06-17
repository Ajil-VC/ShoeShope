const {Admin,User} = require('../models/models')
const bcrypt = require('bcrypt');

const securePassword = async (password) => {
    
    try{

        const hashedP = await bcrypt.hash(password,10);
        return hashedP;

    }catch(error){
        console.log(error)
    }

}

const adminRegistration = async(req,res) => {


        try{

            const {firstName,lastName,email,password} = req.body
           
            const sPassword = await securePassword(password)


            const newAdmin = new Admin({
                firstName   : firstName,
                lastName    : lastName,
                email       : email,
                password    : sPassword,
                isAuthorised  : 1  
            })

    
            const adminData = await newAdmin.save();

            if(adminData){
                return console.log('Admin Created Successfully')
            }else{
                return console.log('Something went wrong while registering Admin')
            }
        }catch(error){
            console.log('Error while registering Admin\n',error);
        }
}

const  loadLogin = async(req,res) => {

    try{
        return res.status(200).render('adminLogin')
    }catch(error){
        console.log("Error when tried to login Admin", error)
        res.status(500).send('Internal Server Error')
    }
}

const loginAdmin = async(req,res) => {

    try{

        const {email,password} = req.body;

        const adminData = await Admin.findOne({email}).exec();
        if(!adminData){
            return res.status(404).send('Admin not found')
        }
        const passwordMatch = await bcrypt.compare(password,adminData.password)
        
        if(passwordMatch){
            req.session.admin_id = adminData._id; 
            req.session.isAuthorised = adminData.isAuthorised; 
            return res.status(200).render('dashboard')
        }else{
            return res.status(404).send('Email or Password Incorrect')
        }

    }catch(error){
        
        console.log('Error while Admin loggin in',error);
        return res.status(500).send("Internal server error while Admin login")
    }

}



const loadCustomerList = async(req,res) => {


    const page = parseInt(req.query.page) || 1 ;
    const limit = 10;
    try{

        //Getting fetched data here
        // const searchQuery = req.query.query;
        // console.log(typeof searchQuery)

        // if(typeof searchQuery === "undefined"){

        //     //If you don't provide .exec() at the end of a Mongoose query, Mongoose will still execute the query, but it won't return a promise immediately. Instead, it will return a Mongoose Query object, which allows for further chaining of query methods before execution.
        //     const userData = await User.find({ isVerified : 1 }).exec();
        //     return res.status(200).render('customerList',{users:userData});
        // }else{

        //     //'.*'+searchQuery+'.*' It will match any document where the field contains the substring and i stands for caseinsensitive
        //     const regexPattern = new RegExp('.*'+searchQuery+'.*','i');
        //     const userData = await User.find({firstName : regexPattern}).exec();

        //     return res.json(userData)

        // }

        const skip = (page - 1) * limit; 

        const userData = await User.find().skip(skip).limit(limit).exec();
        const totalDocuments = await User.countDocuments().exec();
        const totalPages = Math.ceil(totalDocuments / limit);
        return res.status(200).render('customerList',{user : userData, totalPages : totalPages, currentPage : page});
        // return res.status(200).json({user : userData, totalPages : totalPages, currentPage : page})

        
    }catch(error){
        console.log("Error While rendering customerList\n",error)
        return res.status(500).send('Server Error whil taking customer list',error)
    }
}

const blockOrUnblockUser = async (req,res) => {



    const idToBlockorUnblock = req.query.id;
    try{

        const userData = await User.findOne({_id:idToBlockorUnblock})
        if(!userData.isBlocked){
            await User.updateOne({_id:idToBlockorUnblock},{$set:{isBlocked:1}});
            //should send the json data to frontend and update it there.
            
        }else{
            await User.updateOne({_id:idToBlockorUnblock},{$set:{isBlocked:0}})
            //should send the json data to frontend and update it there.    
        }
     

    }catch(error){
        console.log('Internal Error while blocking or unblocking ',error)
        return res.status(500).send("Internal Error while blocking or unblocking")
    }

}

const deleteUser = async (req,res) => {
    
    const idToDelete = req.query.id;

    try{

        
        await User.deleteOne({_id : idToDelete})
        console.log("User Deleted successfully ")

        //should send the json data to frontend and update it there.
     

    }catch(error){
        console.log('Internal Error while deleting user',error)
        return res.status(500).send("Internal Error while deleting user")
    }

}

module.exports = {
    adminRegistration,
    loadLogin,
    loginAdmin,
    loadCustomerList,
    blockOrUnblockUser,
    deleteUser
}