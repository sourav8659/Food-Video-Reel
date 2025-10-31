const mongoose=require('mongoose');
const dbgr=require("../utils/dbgr").mongoose;

async function connectDB() {
    await mongoose.connect(process.env.MONGODB_URI)
        .then(() => dbgr("MongoDB connected"))
        .catch((err) => dbgr("MongoDB connection error: ",err))
}

module.exports=connectDB;