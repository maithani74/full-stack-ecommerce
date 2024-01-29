const { Category } = require("../models/categoryModel");
const slugify = require("slugify");
exports.createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        success: false,
        message: "Category Name is Required",
      });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res
        .status(200)
        .send({ success: true, message: "Category already exisits" });
    }
    const category =await  new Category({ name, slug: slugify(name) }).save();
    res.status(201).send({
      success: true,
      message: "Category Created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      error,
      message: "Something went Wrong",
    });
  }
};

exports.updateCategoryController = async(req,res)=>{
  try {
    const {name}=req.body
    const {id}=req.params;
    console.log(name)
    const category = await Category.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
    res.status(200).send({
      success:true,
      message:"Category updated Successfully",
      category
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:"Error while updating category"
    })
  }
}

exports.categoryController =async(req,res)=>{
  try {
    const category = await Category.find({});
    res.status(200).send({
      success:true,
      message:"All Categories List",
      category
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      error,
      message:"Error while fetching"
    })
  }
}

exports.getCategoryController = async(req,res)=>{
  try {
    const {slug} = req.params;
    const category = await Category.findOne({slug})
    res.status(200).send({
      success:true,
      category,
      message:"Category Found"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Error while getting Category",
      error,
    })
  }
}

exports.deleteCategoryController = async(req,res)=>{
  try {
    const {id} = req.params;
    const category  = await Category.findByIdAndDelete(id);
    res.status(200).send({
      message:"Deleting Succesfully",
      success:true,
      category
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Error in deleting Category",
      error,
    })
  }
}