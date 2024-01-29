import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";

const Search = () => {
  const [values, setValues] = useSearch();
  console.log(values);
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.result?.length < 1
              ? "No Products Found"
              : `Found ${values?.result?.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {
              values?.result?.map((product) => (
                <>
                  <div class="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                      class="card-img-top"
                      alt="p.name"
                    />
                    <div class="card-body">
                      <h5 class="card-title">{product.name}</h5>
                      <p class="card-text">
                        {product.description.substring(0, 50)}...
                      </p>
                      <p class="card-text">${product.price}</p>
                      <button className="btn btn-primary ms-1">
                        More Details
                      </button>
                      <button className="btn btn-secondary ms-1">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
