const express=require('express');
const authMiddleware=require('../middlewares/auth.middleware');
const foodpartnerController=require('../controllers/food-partner.controller');

const router=express.Router();

router.get('/:id',authMiddleware.authUserMiddleware,foodpartnerController.getFoodParterById);

module.exports=router;