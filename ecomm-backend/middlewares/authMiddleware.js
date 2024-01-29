const jwt  = require('jsonwebtoken');
const { User } = require("../models/userModel");

//protected Routes token base

exports.requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
    req.user =decode;
    next();
  } catch (error) {
    console.log(error);
  }
};
exports.isAdmin = async(req,res,next)=>{
  try {
    const user = await User.findById(req.user._id);
    if(user.role!==1){
      return res.status(401).send({
        success:false,
        messsage:"Unauthorised Access"
      })
    }else{
      next();
    }
  } catch (error) {
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
    console.log(error)
  }
}