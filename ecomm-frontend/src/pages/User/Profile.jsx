import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  useEffect(()=>{
    const {name,email,phone,address} = auth?.user;
    setName(name);
    setPhone(phone);
    setAddress(address);
    setEmail(email);
  },[auth.user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = localStorage.getItem('auth');
      const parsed = JSON.parse(user);
      const token = parsed.token;
      const {data} = await axios.put(
        `http://localhost:8080/api/v1/auth/profile`,
        {
          name,
          email,
          password,
          phone,
          address,
        },{
          headers:{"Authorization":`${token}`}
        }
      );
      if(data?.error){
        toast.success(data?.error)
      }else{
        setAuth({...auth,user:data?.updatedUser})
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth",JSON.stringify(ls))
        toast.success("Profile updated successfully")
      }
    } catch (error) {
      console.log(error);
      toast.error("Something is wrong");
    }
  };
  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container mt-3">
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
                     
                    disabled
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
                     
                  />
                </div>

                <button type="submit" class="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
