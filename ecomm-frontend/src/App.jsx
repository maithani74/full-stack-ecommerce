
import { Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/User/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateProduct from './pages/Admin/CreateProduct';
import CreateCategory from './pages/Admin/CreateCategory';
import Users from './pages/Admin/Users';
import Orders from './pages/User/Orders';
import Profile from './pages/User/Profile';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import AdminOrders from './pages/Admin/AdminOrders';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/product/:slug" element={<ProductDetail/>}/>
        <Route path='/dashboard' element={<PrivateRoute/>}>
          <Route path="user" element={<Dashboard/>}/>
          <Route path="user/orders" element={<Orders/>}/>
          <Route path="user/profile" element={<Profile/>}/>
        </Route>
        <Route path='/dashboard' element={<AdminRoute/>}>
          <Route path='admin' element={<AdminDashboard/>}/>
          <Route path='admin/orders' element={<AdminOrders/>}/>
        <Route path="admin/create-product" element={<CreateProduct/>}/>
        <Route path="admin/products" element={<Products/>}/>
        <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
        <Route path="admin/create-category" element={<CreateCategory/>}/>
        <Route path="admin/users" element={<Users/>}/>
        </Route>
        <Route path="/about" element={<About/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/*" element={<PageNotFound/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  );
  }

export default App;
