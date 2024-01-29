import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import {Modal} from 'antd'
import CategoryForm from "../../components/Forms/CategoryForm";
const CreateCategory = () => {
  const [name, setName] = useState();
  const [categories, setCategories] = useState([]);
  const [open,setOpen] = useState(false);
  const [selected,setSelected] = useState('');
  const [updated,setUpdated] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = localStorage.getItem('auth');
      const parsed = JSON.parse(user);
      const token = parsed.token;
      
      const {data}  = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",{name},{
          headers:{'authorization':`${token}`}
        });
        console.log(data)
      if (data?.success) {
        toast.success(`${name} is created `);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast("Something went wrong in input form");
    }
  };

   
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
  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async(e)=>{
    e.preventDefault();
    try {
      const user = localStorage.getItem('auth');
      const parsed = JSON.parse(user);
      const token = parsed.token;
      const {data} = await axios.put(`http://localhost:8080/api/v1/category/update-category/${selected._id}`,{name:updated},{
        headers:{"Authorization":`${token}`}
      })
      if (data?.success) {
        toast.success(`updated successfully `);
        setSelected(null);
        setUpdated(null);
        setOpen(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating categories");
    }
  }

  const handleDelete = async(id)=>{
    try {
      const user = localStorage.getItem('auth');
      const parsed = JSON.parse(user);
      const token = parsed.token;
      const {data} = await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${id}`,{
        headers:{"Authorization":`${token}`}
      })
      if (data?.success) {
        toast.success(`Deleted successfully `);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating categories");
    }
  }

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Categories</h1>
            <div className="p-3 w-50">
              <CategoryForm
                value={name}
                setValue={setName}
                handleSubmit={handleSubmit}
              />
            </div>
            <div className="w-75">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category) => (
                    <tr>
                      <>
                        <td>{category.name}</td>
                        <td>
                          <button className="btn btn-primary ms-2" onClick={()=>{setOpen(true); setUpdated(category.name) ;setSelected(category)}}>Edit</button>
                          <button className="btn btn-danger ms-2" onClick={()=>handleDelete(category._id)}>Delete</button>
                        </td>
                      </>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal onCancel={()=>setOpen(false )} footer={null} open = {open}>
            <CategoryForm  value = {updated} setValue={setUpdated} handleSubmit={handleUpdate}/>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
