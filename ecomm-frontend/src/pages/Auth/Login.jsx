import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/Auth.css";
import { useAuth } from "../../context/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [auth, setAuth] = useAuth();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something is wrong");
    }
  };
  return (
    <Layout title={"Register - Ecommerce App"}>
      <div className="form-container">
        <h1>LOGIN FORM</h1>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              class="form-control"
              id="exampleInputEmail2"
              aria-describedby="emailHelp"
              placeholder="Email"
              required
            />
          </div>

          <div class="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              class="form-control"
              id="exampleInputPassword5"
              placeholder="Password"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
          <div className="mt-3">
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password 
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
