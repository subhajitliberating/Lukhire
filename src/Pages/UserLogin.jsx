import React, { useEffect, useState } from "react";
import bannre from "../assets/images/about-bg.jpg";
import logo from "../assets/logo.png";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLogin = ({ setToken }) => {
  const Api_url = import.meta.env.VITE_API_URL;
  const nav = useNavigate();
  const location = useLocation();



  const [login, setLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (location.pathname === "/login") {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [location.pathname]);

  const handleChange = (e) => {
    setMessage("");
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${Api_url}/user/user/${login ? "login" : "register"}`,
        formData,
        {
          headers: {
            withCredentials: true,
            "Content-Type": "application/json",
          },
        }
      );
    

      const token = response.data.token;
      if (login && token) {
        localStorage.setItem("lukhiretoken", token);   // ✅ Save token
                           // ✅ Set token in app state
        toast.success("Login successful!");     // ✅ Show success toast
        nav("/");                               // ✅ Navigate to homepage
      } else {
        toast.success("Registration successful!"); // Optional message
        nav("/login");
      }
    } catch (error) {
      console.error(error, "Error during login");
      const errorMsg = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMsg); // ✅ Show error toast
    }
  };

  return (
    <section className="vh-100">
      <ToastContainer /> {/* ✅ Toast container */}
      <div className="container-fluid login-continer">
        <div className="row">
          <div className="col-sm-6 text-black">
            <div className="px-5 ms-xl-4" onClick={()=>{
              nav("/");
            }}>
              
              <img src={logo} alt="logo" className="img-fluid my-2" />
            </div>

            <div className="d-flex align-items-center h-custom-2 px-5 mt-5 pt-5">
              <form style={{ width: "23rem" }}>
                <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                  {login ? "Log in" : "Register"}
                </h3>

                {!login && (
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="User Name"
                      name="userName"
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Email address"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                  />
                </div>

                <div className="pt-1 mb-4">
                  <button
                    className="btn btn-info btn-lg btn-block cus-color"
                    type="button"
                    onClick={handleSubmit}
                  >
                    {login ? "Login" : "Register"}
                  </button>
                </div>

                
                {login && (
                  <p className="small mb-2 pb-lg-2">
                    <a className="text-muted" href="#!">
                      Forgot password?
                    </a>
                  </p>

                )}
                 <p className="small mb-1 pb-lg-2">
                    <a className="text-muted" href="/">
                     {`Go back`}
                    </a>
                  </p>

                <div className="pt-1 mb-4">
                  <Link
                    to={login ? "/register" : "/login"}
                    className="accent-btn w-100 border-0 py-3 "
                  >
                    Go to {login ? "Register" : "Login"}
                  </Link>
                </div>
              </form>
            </div>
          </div>

          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img
              src={bannre}
              alt="Login image"
              className="w-100 vh-100"
              style={{ objectFit: "cover", objectPosition: "left" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserLogin;
