const foodpartnerModel=require('../models/food-partner.model');
const foodModel=require('../models/food.model');

async function getFoodParterById(req,res) {
    const foodpartnerId=req.params.id;
    
    const foodpartner=await foodpartnerModel.findById(foodpartnerId).select('-password');
    const foodItemsByFoodpartner=await foodModel.find({foodPartner: foodpartnerId});
    
    if(!foodpartner) {
        return res.status(404).json({message: "Food Partner not found"});
    }
    
    res.status(200).json({
        message: "Food Partner retrieved successfully",
        foodpartner: {
            ...foodpartner.toObject(),
            foodItems: foodItemsByFoodpartner
        }
    });
}

module.exports={getFoodParterById};