import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const Option = Select
const UpdateProduct = () => {
    const [products, setProducts] = useState();
    const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const params = useParams()
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [shipping, setShipping] = useState();
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [id,setId] = useState("");
  const navigate = useNavigate();
  //get Categories

  const getProduct = async()=>{
    try {
        const {data} = await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.slug}`)
        setName(data.product.name)
        setId(data.product._id);
        setDescription(data.product.description)
        setPrice(data.product.price)
        setQuantity(data.product.quantity)
        setShipping(data.product.shipping)
        setCategory(data.product.category._id)
    } catch (error) {
        console.log(error)
    }
  }

  
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-categories"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };
  useEffect(()=>{
    getAllCategory();
  },[])
  //create Product
  const handleClick = async(e)=>{
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name",name)
      productData.append("description",description)
      productData.append("quantity",quantity)
      productData.append("price",price)
      productData.append("shipping",shipping)
     photo && productData.append("photo",photo)
      productData.append("category",category)
      const user = localStorage.getItem('auth');
      const parsed = JSON.parse(user);
      const token = parsed.token;
      const {data} = axios.put(`http://localhost:8080/api/v1/product/update-product/${id}`,productData,{headers:{"Authorization":`${token}`}})
      if(data?.success){
        toast.error(data?.message);
        
      }else{
        toast.success("Updated Successfully");
        navigate("/dashboard/admin/products")
        getAllProducts();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  const getAllProducts = async () => {
    try {
      const { data } = await axios(
        "http://localhost:8080/api/v1/product/get-products"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ");
    }
  };
  useEffect(()=>{
    getProduct()
  },[])

  const handleDelete  = async()=>{
    try {
        let answer = window.prompt("Are You sure want to delete this product ? ");
        if(!answer)return
        const {data} = await axios.delete(`http://localhost:8080/api/v1/product/delete-product/${id}`)
        toast.success("Product Deleted Successfully")
        navigate("/dashboard/admin/products");
        getAllProducts();
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong")
    }
  }

  return (
    <Layout title={"Dashboard- Update Products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Products</h1>
            <div className="m-1">
              <Select
                variant={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="photo"
                      height="200px"
                      className="img img-responsive"
                    />
                  </div>
                ):(
                    <div className="text-center">
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${id}`}
                      alt="photo"
                      height="200px"
                      className="img img-responsive"
                    />
                  </div> 
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Price of product"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Quantity of product"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select 
                variant={false}
                placeholder="Select Shipping Status"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setShipping (value);
                }}
                value={shipping ? 1 : 0}>
                  <Option value={1}>Yes</Option>
                  <Option value={0}>No</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleClick}> Update Product </button>
                <button className="btn btn-danger" onClick={handleDelete}> Delete Product </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UpdateProduct