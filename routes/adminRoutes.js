const express = require('express');
const adminRouter = express.Router();

adminRouter.use((req,res,next) => {

    req.app.set('views','./views/Admin');
    next();
})
const adminController = require('../controllers/adminController')

// Admin Signup done by postman
adminRouter.post('/signup',adminController.adminRegistration)

adminRouter.get('/',adminController.loadLogin)


module.exports = adminRouter;