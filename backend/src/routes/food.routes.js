const express=require('express');
const multer=require('multer');
const foodController=require('../controllers/food.controller');
const authMiddleware=require('../middlewares/auth.middleware');

const router=express.Router();
const upload=multer({storage: multer.memoryStorage()});

router.post('/',authMiddleware.authFoodpartnerMiddleware,upload.single('video'),foodController.createFood);
router.get('/',authMiddleware.authUserMiddleware,foodController.getFoodItems);
// router.post('/like',authMiddleware.authUserMiddleware,foodController.likeFood);

module.exports=router;