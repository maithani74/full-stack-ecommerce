const mongoose = require('mongoose');
const connectDB = async()=>{
    try{
        const con =await mongoose.connect("mongodb+srv://maithani:rahul@cluster0.ifjh2dq.mongodb.net/ecomm");
        console.log(`connected ${con.connection.host}`)
    }catch(err){
        console.log(err);
    }
}
exports.connectDB = connectDB