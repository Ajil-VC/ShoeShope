const express = require('express');
const adminRouter = express.Router();

adminRouter.use((req,res,next) => {

    req.app.set('views','./views/Admin');
    next();
    
})
const adminController = require('../controllers/adminController')

// Admin Signup done by postman
adminRouter.post('/signup',adminController.adminRegistration)

adminRouter.get('/login',adminController.loadLogin)
adminRouter.post('/login',adminController.loginAdmin)
adminRouter.get('/customers',adminController.loadCustomerList)


module.exports = adminRouter;