import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/Auth.css"
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
        answer
      });
      if(res && res.data.success){
        toast.success(res.data && res.data.message)
        navigate("/login");
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something is wrong");
    }
  };
  return (
    <Layout title={"Register - Ecommerce App"}>
      <div className="form-container">
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Name"
              required
            />
          </div>
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              class="form-control"
              id="exampleInputEmail3"
              aria-describedby="emailHelp"
              placeholder="Phone"
              required
            />
          </div>
          <div class="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              class="form-control"
              id="exampleInputEmail4"
              aria-describedby="emailHelp"
              placeholder="Address"
              required
            />
          </div>
          <div class="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              class="form-control"
              id="exampleInputEmail4"
              aria-describedby="emailHelp"
              placeholder="What is your favourite sports ?"
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
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
