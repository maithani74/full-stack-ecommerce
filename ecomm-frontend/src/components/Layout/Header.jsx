import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Forms/SearchInput";
import { useCart } from "../../context/Cart";
import {Badge} from 'antd'
export const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const handleLogout = (e) => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link class="navbar-brand" to="#">
              {" "}
              🛒 Ecommerce App
            </Link>
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput/>
              <li class="nav-item">
                <Link class="nav-link " aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link " to="/category">
                  Category
                </Link>
              </li>

              {!auth.user ? (
                <>
                  <li class="nav-item">
                    <Link class="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li class="nav-item dropdown">
                    <Link
                      class="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </Link>
                    <ul class="dropdown-menu">
                      <li>
                        <Link class="dropdown-item" to={`/dashboard/${auth?.user?.role === 1?"admin":"user"}`} >
                          Dashboard
                        </Link>
                      </li>
                      <li >
                    <Link onClick={handleLogout} class="dropdown-item" to="/login">
                      Logout
                    </Link>
                  </li>
                    </ul>
                  </li>
                  
                </>
              )}
              <li class="nav-item">
                <Badge count={cart?.length} showZero>

                <Link class="nav-link" to="/cart">
                  Cart
                </Link>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
