import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
const Cart = () => {
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => (total = total + item.price));
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === id);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true)
      const user = localStorage.getItem("auth");
      const parsed = JSON.parse(user);
      const token = parsed.token;
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        },
        { headers: { 'Authorization': `${token}` } }
      );
      setLoading(false)
      localStorage.removeItem('cart')
      setCart([])
      navigate("/dashboard/user/orders")
      toast.success("Payment Successfull")
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="div container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {" "}
              {cart?.length > 0
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please Login to checkout "
                  }`
                : "Your cart is empty"}{" "}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    class="card-img-top"
                    alt="p.name"
                    width="100px"
                  />
                </div>
                <div className="col-md-8">
                  
                  <p>{p.name}</p>
                  <p>Description: {p.description.substring(0, 40)}</p>
                  <h4>Price: ${p.price}</h4>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
          <DropIn options={{authorization:clientToken}} onInstance={(instance)=>setInstance(instance)}/> 
            <h4>Cart Summary</h4>
            <p>Total | Checkout | Payment </p>
            <hr />
            <h4>Total : ${totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  {auth?.token ? (
                    <>
                      <button
                        className="button btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    </>
                  ) : (
                    <button
                      className="button btn btn-outline-warning"
                      onClick={() => navigate("/login", { state: "/cart" })}
                    >
                      Please login to checkout
                    </button>
                  )}
                </div>
              </>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (" "): (
                <>
                <DropIn
            options={{authorization:clientToken,
            paypal:{
              flow:'vault'
            }}}
            onInstance={instance=>setInstance(instance)}
            />
            <button className="btn btn-primary" onClick={handlePayment}>{loading ? "Processing" : "Make Payment"}</button>
                </>

              )}
            
          </div>
          </div>
          
        </div>
      </div>
      
    </Layout>
  );
};

export default Cart;
