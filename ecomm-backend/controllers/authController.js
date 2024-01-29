const { User } = require("../models/userModel");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const JWT = require("jsonwebtoken");
const { Order } = require("../models/orderModel");
exports.registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address,answer } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone is required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required" });
    }
    //checking  user
    const existingUser = await User.findOne({ email });
    //checking existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);

    //save
    const user = await new User({
      name,
      email,
      phone,
      address,
      password: hashedPassword,answer,role
    }).save();
    res.status(201).send({
      success: true,
      message: "User registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

// LOGIN

exports.loginController = async (req, res) => {
  try {
    const {email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Email or password invalid",
      });
    }
    //check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "70d",
    });
    res.status(200).send({
        success:true,
        message:"login successfully",
        user:{
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address,
            _id:user._id,
            role:user.role,
        },
        token,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

exports.testController = (req,res)=>{
    res.send("hello")
}

exports.forgotPasswordController=async(req,res)=>{
  try {
    const {email,answer,newPassword} = req.body;
    if(!email){
      res.status(400).send({message:"Email is Required"})
    }if(!answer){
      res.status(400).send({message:"answer is Required"})
    }if(!newPassword){
      res.status(400).send({message:"Password is Required"})
    }
    //check
    const user = await User.findOne({email,answer});
    if(!user){
      res.status(400).send({success:false,message:"Wrong email or password"})
    }
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id,{password:hashed});
    res.status(200).send({
      success:true,
      message:"Password Reset Successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Something went wrong"
    })
  }
}


exports.updateProfileController = async(req,res)=>{
  try {
    const  {name,email,password,address,phone}  =req.body
    const user = await User.findById(req.user._id);
    if(password && password.length < 6){
      return res.json({error:"Password is required and 6 character long"})
    }
    const hashedPassword = password ? await hashPassword(password):undefined
    const updatedUser = await User.findByIdAndUpdate(req.user._id,{
      name:name || user.name,
      password : hashedPassword || user.password,
      phone : phone || user.phone,
      address : address || user.address
    },{new:true})
    res.status(200).send({
      success : true,
      message:"Profile Updated successfully",
      updatedUser
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Error while updating profile",
      error
    })
  }
}

exports.getOrdersController = async(req,res)=>{
  try {
    const orders = await Order.find({buyer:req.user._id}).populate('products','-photo').populate("buyer","name")
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:true,
      message:"Error in getting orders",
      error
    })
  }
}
exports.getAllOrdersController = async(req,res)=>{
  try {
    const orders = await Order.find({}).populate('products','-photo').populate("buyer","name")
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:true,
      message:"Error in getting orders",
      error
    })
  }
}

exports.orderStatusController = async(req,res)=>{
  try {
    const {orderId} = req.params;
    const {status} = req.body;
    const orders = await Order.findByIdAndUpdate(orderId,{status},{new:true})
    res.json(orders)
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Error in updating user status",
      error
    })
  }
}