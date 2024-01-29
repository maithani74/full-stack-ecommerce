import React, { useState,useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import moment from "moment";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
const AdminOrders = () => {
  const [orders, setOrders] = useState();
  const [auth, setAuth] = useAuth();
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Deliverd",
    "Cancelled",
  ]);
  const [changeStatus,setChangeStatus] =useState();
  const getData = async () => {
    try {
      const dt = localStorage.getItem("auth");
      const parseddt = JSON.parse(dt);
      const token = parseddt.token;

      const { data } = await axios.get(
        "http://localhost:8080/api/v1/auth/all-orders",
        {
          headers: { Authorization: `${token}` },
        }
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [auth?.token]);

  const handleChange = async(orderid,value)=>{
    try {
        const dt = localStorage.getItem("auth");
      const parseddt = JSON.parse(dt);
      const token = parseddt.token;

        const {data} = await axios.put(`http://localhost:8080/api/v1/auth/order-status/${orderid}`,
        {status:value},
        {
          headers: { Authorization: `${token}` },
        })
        getData()
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <>
      <Layout title={"All Orders Data"}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => (
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyes</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select variant={false} onChange={(value)=>handleChange(o._id,value)} defaultValue={o?.status}>
                            {status.map((e,i)=>(

                            <Option key={i} value={e}>
                                {e}
                            </Option>
                            ))}

                        </Select>
                      </td>
                      <td>{o?.buyer.name}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p, i) => (
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
                        {/* <p>Description: {p.description.substring(0, 40)}</p> */}
                        <h4>Price: ${p.price}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AdminOrders;
