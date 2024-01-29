import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState();
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
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex">
            
          {products?.map((product) => (
            <>
            <Link key={product._id} to={`/dashboard/admin/product/${product.slug}`} 
              className="product-link"
              >
            
              <div class="card m-2" style={{width:"18rem"}} >
                <img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} class="card-img-top" alt="p.name" />
                <div class="card-body">
                  <h5 class="card-title">{product.name}</h5>
                  <p class="card-text">
                    {product.description}
                  </p>
                </div>
              </div>
              </Link>
            </>
          ))}
          
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
