import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts,setRelatedProducts] = useState([]);
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params.slug]);
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    //   getSimilarProducts(data?.product?._id,data?.product?.category?._id)
    } catch (error) {
      console.log(error);
    }
  };

//   const getSimilarProducts = async(pid,cid)=>{
//     try {
//         const {data} = await axios.get(`http://localhost:8080/api/v1/product/related-products/${pid}/${cid}`);
//         setRelatedProducts(data?.products)
//     } catch (error) {
//         console.log(error);
//     }
//   }

  return (
    <Layout>
      <div className="row container">
        <div className="col-md-6">
          <img
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            class="card-img-top"
            alt="p.name"
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h4>Name : {product.name}</h4>
          <h4>About : {product.description}</h4>
          <h4>Price : {product.price}</h4>
          <h4>Brand : {product.category?.name}</h4>
          <button className="btn btn-primary ms-1">Add to cart</button>
        </div>
      </div>
      <div className="row">
        <h1>Similar Products</h1>
        {/* {JSON.stringify(relatedProducts,null,4)} */}
      </div>
    </Layout>
  );
};

export default ProductDetail;
