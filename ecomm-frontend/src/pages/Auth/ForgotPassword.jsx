import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import "../../styles/Auth.css";
import { useAuth } from "../../context/auth";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/auth/forgot-password`, {
        email,
        newPassword,
        answer
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
       
        navigate( "/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something is wrong");
    }
  };
  return (
    <>
      <Layout title={"Forgot Password Ecommerce-App"}>
        <div className="form-container">
          <h1>Frogot Password FORM</h1>
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
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                class="form-control"
                id="exampleInputEmail2"
                aria-describedby="emailHelp"
                placeholder="What is your favourite sports ?"
                required
              />
            </div>

            <div class="mb-3">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                class="form-control"
                id="exampleInputPassword5"
                placeholder="Password"
                required
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Reset
            </button>
            
          </form>
        </div>
      </Layout>
    </>
  );
};

export default ForgotPassword;
