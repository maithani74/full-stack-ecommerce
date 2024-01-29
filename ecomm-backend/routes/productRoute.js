const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController, productFilterController, countProductController, productListController, searchProductController, retlatedProductController, tokenController, paymentController } = require('../controllers/productController');
const router = express.Router();
const formidable = require('express-formidable')
router.post("/create-product",requireSignIn,isAdmin,formidable(),createProductController)
.get("/get-products",getProductController)
.get("/get-product/:slug",getSingleProductController)
.get("/product-photo/:id",productPhotoController)
.delete("/delete-product/:id",deleteProductController)
.put("/update-product/:id",requireSignIn,isAdmin,formidable(),updateProductController)
.post("/filter-product",productFilterController)
.get("/count-product",countProductController)
.get("/product-list/:page",productListController)
.get("/search/:keyword",searchProductController)
.get("/braintree/token",tokenController)
.post("/braintree/payment",requireSignIn,paymentController)
exports.router = router;