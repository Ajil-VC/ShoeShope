const express = require('express');
const adminRouter = express.Router();
const path = require('path');


const multer = require('multer')
const storage = multer.diskStorage({

    destination: function(req,file,cb){

        cb(null,path.join(__dirname,'../public'))
    },
    filename: function(req,file,cb){
        const name = Date.now()+'_'+file.originalname;
        cb(null,name)
    }
})
const upload = multer({storage:storage})



adminRouter.use((req,res,next) => {

    req.app.set('views','./views/Admin');
    next();
    
})
const adminController = require('../controllers/adminController')

// Admin Signup done by postman
adminRouter.post('/signup',adminController.adminRegistration);

adminRouter.get('/login',adminController.loadLogin);
adminRouter.post('/login',adminController.loginAdmin);
adminRouter.get('/dashboard',adminController.loadDashboard);

adminRouter.get('/customers',adminController.loadCustomerList);
adminRouter.patch('/customers',adminController.blockOrUnblockUser);
adminRouter.delete('/customers',adminController.deleteUser);

adminRouter.get('/category',adminController.loadCategory);
adminRouter.post('/category',adminController.addBrandOrCategory);
adminRouter.patch('/category',adminController.softDeleteCategory);

adminRouter.get('/productslist',adminController.loadAllProducts);
adminRouter.get('/productslist/add_new_product',adminController.loadAddNewProduct);
adminRouter.post('/productslist/add_new_product',upload.single('image'),adminController.addNewProduct);



module.exports = adminRouter;