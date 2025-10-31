const foodModel=require('../models/food.model');
const storageServiece=require('../services/storage.service');
const {v4: uuid}=require('uuid');

const createFood=async(req,res) => {
    const fileUploadResult=await storageServiece.uploadFile(req.file.buffer,uuid());
    
    const foodItem=await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodpartner._id
    });
    
    res.status(201).json({message: "food created successfully", food: foodItem});
}

async function getFoodItems(req,res) {
    const foodItems=await foodModel.find();
    let isUser=false,isFoodPartner=false;
    if(req.user)   isUser=true;
    if(req.foodpartner) isFoodPartner=true;
    res.status(200).json({message: "Food items fetched successfully", foodItems, isUser, isFoodPartner});
}

async function likeFood(req,res) {
    const {foodId} = req.body;
    const userId=req.user._id;
}

module.exports={createFood,getFoodItems,likeFood};