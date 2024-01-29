const express = require("express");
const {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} = require("../controllers/authController");
const {requireSignIn, isAdmin} = require('../middlewares/authMiddleware')
// router object
const router = express.Router();

//routing

//REGISTER
router.post("/register", registerController)
.post("/login", loginController)
.get('/test',requireSignIn,isAdmin, testController)
.get('/user-auth',requireSignIn,(req,res)=>{
  res.status(200).send({ok:true})
})
.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
  res.status(200).send({ok:true})
})
.post('/forgot-password',forgotPasswordController)
.put("/profile",requireSignIn,updateProfileController)
.get("/orders",requireSignIn,getOrdersController)
.get("/all-orders",requireSignIn,isAdmin,getAllOrdersController)
.put("/order-status/:id",requireSignIn,isAdmin,orderStatusController)
exports.router = router;
