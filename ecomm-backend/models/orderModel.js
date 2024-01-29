const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.ObjectId,
      ref: "Products",
    },
  ],
  payment:{},
  buyer:{
    type:mongoose.ObjectId,
    ref:'User',
  },
  status:{
    type:String,
    default: 'Not Process',
    enum: ["Not Process","Processing","Shipped","Deliverd","Cancelled"]
  }
},{timestamps:true});

exports.Order = mongoose.model("Order", orderSchema);
