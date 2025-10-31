// create server
const express=require('express');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const authRoutes=require('./routes/auth.routes');
const foodRoutes=require('./routes/food.routes');
const foodPartnerRoutes=require('./routes/food-partner.routes');

const app=express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/",(req,res) => {
    res.send("Hello World");
});
app.use("/api/auth",authRoutes);
app.use("/api/food",foodRoutes);
app.use("/api/food-partner",foodPartnerRoutes);

module.exports=app;