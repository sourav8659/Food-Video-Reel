const foodpartnerModel=require('../models/food-partner.model');
const userModel=require('../models/user.model');
const jwt=require('jsonwebtoken');

async function authFoodpartnerMiddleware(req,res,next) {
    const token=req.cookies.token;
    
    if(!token) {
        return res.status(401).json({message: "Please login first"});
    }
    
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const foodpartner=await foodpartnerModel.findById(decoded.id);
        if(foodpartner) {
            req.foodpartner=foodpartner;
            next();
        } else {
            return res.status(401).json({message: "Invalid token"});
        } 
    } catch(err) {
        return res.status(400).json({message: "Invalid token"});
    }
}

async function authUserMiddleware(req,res,next) {
    const token=req.cookies.token;
    
    if(!token) {
        return res.status(401).json({message: "Please login first"});
    }
    
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decoded.id);
        const foodpartner=await foodpartnerModel.findById(decoded.id);
        if(user) {
            req.user=user;
            next();
        } else if(foodpartner) {
            req.foodpartner=foodpartner;
            next();
        } else {
            return res.status(401).json({message: "Invalid token"});
        } 
    } catch(err) {
        return res.status(400).json({message: "Invalid token"});
    }
}

module.exports={authFoodpartnerMiddleware,authUserMiddleware};