const mongoose = require('mongoose');

const connectDatabase=()=>{
    
    mongoose.connect(process.env.MONGO_DB_URI).then(()=>{
        console.log("Database connected successfully");
    })
    .catch(()=>{
        console.log("Database connection failed");
    })
}

module.exports=connectDatabase;