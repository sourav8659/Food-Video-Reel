// require('dotenv').config();
require('@dotenvx/dotenvx').config();

// start server
const app=require('./src/app');
const connectDB=require('./src/db/db');
const dbgr=require("./src/utils/dbgr").server;

app.listen(3500,async() => {
    await connectDB();
    dbgr("Server running on port 3500 \nSite: http://localhost:3500/");
});
