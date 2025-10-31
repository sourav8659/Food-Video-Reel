const userModel=require('../models/user.model');
const foodpartnerModel=require('../models/food-partner.model');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

async function registerUser(req,res) {
    const {fullname,email,password} = req.body;
    
    const isUserAlreadyExists=await userModel.findOne({email});
    if(isUserAlreadyExists) {
        return res.status(400).json({message: "User already exists"});
    }
    
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await userModel.create({
        fullname,email,
        password: hashedPassword
    });
    
    const token=jwt.sign({id: user._id, email: user.email},process.env.JWT_SECRET);
    res.cookie("token",token);
    
    res.status(201).json({
        message: "User registered successfully", 
        user: {
            email: user.email,
            fullname: user.fullname
        }
    });
}

async function loginUser(req,res) {
    const {email,password} = req.body;
    
    const user=await userModel.findOne({email});
    if(!user) {
        res.status(400).json({message: "Invalid email or password"});
    }
    
    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid) {
        res.status(400).json({message: "Invalid email or password"});
    }
    
    const token=jwt.sign({id: user._id, email: user.email},process.env.JWT_SECRET);
    res.cookie("token",token);
    
    res.status(200).json({
        message: "User logged in successfully", 
        user: {
            email: user.email,
            fullname: user.fullname
        }
    });
}

function logoutUser(req,res) {
    res.clearCookie("token");
    res.status(200).json({message: "User logged out successfully"});
}

async function registerFoodpartner(req,res) {
    const {name,contactName,phone,address,email,password} = req.body;
    
    const isAccountAlreadyExists=await foodpartnerModel.findOne({email});
    if(isAccountAlreadyExists) {
        return res.status(400).json({message: "Food partner account already exists"});
    }
    
    const hashedPassword=await bcrypt.hash(password,10);
    const foodpartner=await foodpartnerModel.create({
        name,contactName,phone,address,email,
        password: hashedPassword
    });
    
    const token=jwt.sign({id: foodpartner._id, email: foodpartner.email},process.env.JWT_SECRET);
    res.cookie("token",token);
    
    res.status(201).json({
        message: "Food partner registered successfully", 
        user: {
            email: foodpartner.email,
            name: foodpartner.name,
            contactName: foodpartner.contactName,
            phone: foodpartner.phone,
            address: foodpartner.address
        }
    });
}

async function loginFoodpartner(req,res) {
    const {email,password} = req.body;
    
    const foodpartner=await foodpartnerModel.findOne({email});
    if(!foodpartner) {
        res.status(400).json({message: "Invalid email or password"});
    }
    
    const isPasswordValid=await bcrypt.compare(password,foodpartner.password);
    if(!isPasswordValid) {
        res.status(400).json({message: "Invalid email or password"});
    }
    
    const token=jwt.sign({id: foodpartner._id, email: foodpartner.email},process.env.JWT_SECRET);
    res.cookie("token",token);
    
    res.status(200).json({
        message: "Food partner logged in successfully", 
        user: {
            email: foodpartner.email,
            name: foodpartner.name
        }
    });
}

function logoutFoodpartner(req,res) {
    res.clearCookie("token");
    res.status(200).json({message: "Food partner logged out successfully"});
}

module.exports={registerUser,loginUser,logoutUser,registerFoodpartner,loginFoodpartner,logoutFoodpartner};