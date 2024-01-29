const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { createCategoryController, updateCategoryController, categoryController, getCategoryController, deleteCategoryController } = require('../controllers/categoryController');

const router = express.Router();
router.post("/create-category",requireSignIn,isAdmin,createCategoryController)
.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController)
.get("/get-categories",categoryController)
.get("/get-category/:slug",getCategoryController)
.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryController)
exports.router=router;