import React, { useState } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Api from "./axoisApi/Api";
import Card from "./Card";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./axoisApi/Loader";
import { API } from "./axoisApi/ApiInstance";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/i.test(
      values.password
    )
  ) {
    errors.password = "Required"; // Corrected the typo here
  }

  return errors;
};
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [changeIcon, setChangeIcon] = useState(true);
  const navigate = useNavigate();
  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/signUp");
  };
  const handleForget = (e) => {
    e.preventDefault();
    navigate("/forgetPassword");
  };
  const handleIcon = () => {
    setChangeIcon(!changeIcon);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      // API.post("/api/auth/login",values).then((res)=>{

      // }).catch((err)=>{

      // })
      try {
        setLoading(true);
        const response = await API.post("/api/auth/login", values);
        if (response.status == 200) {
          const {
            data: { data },
          } = response;
          localStorage.setItem("user", JSON.stringify(data));
          toast.success("Logged in successfully");
          navigate("/todo");
        }
        setLoading(false);
      } catch (err) {
        if (err?.response?.data?.detail) {
          toast.error(err?.response?.data?.detail);
        } else {
          toast.error("Something went wrong");
        }
        setLoading(false);
      }
    },
  });
  return (
    <>
      <LoginStyle>
        <form onSubmit={formik.handleSubmit}>
          <h2 className="text-center mb-5 text-white">Login</h2>
          <label htmlFor="">Email or Phone:</label>
          <input
            type="email "
            placeholder="Enter a email or username"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
          <label htmlFor="">Password:</label>
          <div className="password_eyes">
            <input
              type={changeIcon ? "password" : "text"}
              placeholder="Enter a password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {changeIcon ? (
              <AiFillEye className="icon" onClick={handleIcon} />
            ) : (
              <AiFillEyeInvisible className="icon" onClick={handleIcon} />
            )}
          </div>

          {formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
          <Link onClick={handleForget} style={{ textDecoration: "underline" }}>
            Forget Password?
          </Link>
          <button type="submit" className="login">
            {loading ? <Loader /> : "Login"}
          </button>
          <div className="center">
            <span className="text-white">Don't have an account yet?</span>
            <Link
              className="signUp"
              style={{ textDecoration: "underline" }}
              onClick={handleSignUp}
            >
              SignUp
            </Link>
          </div>
        </form>
      </LoginStyle>
      {/* <Api/> */}
      {/* <Card/> */}
    </>
  );
};
export default Login;
export const LoginStyle = styled.div`
  background-color: #080710;
  padding: 26px 0;
  /* height: 100vh; */
  .icon {
    color: black;
    font-size: 23px;
    cursor: pointer;
  }
  .error {
    color: #dc3545;
    font-size: 17px;
  }

  form {
    width: 35%;
    margin: 10px auto;
    background-color: rgba(255, 255, 255, 0.13);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    padding: 40px 30px;
    border-radius: 10px;

    a {
      font-size: 15px;
      color: #fff;
      font-weight: 500;
      float: right;
      text-decoration: none;
      margin-bottom: 20px;
    }
    label {
      display: block;
      font-size: 16px;
      color: white;
      font-weight: 500;
    }
    input {
      display: block;
      width: 100%;
      border-radius: 50px;
      border: none;
      padding: 15px 10px;
      font-size: 14px;
      font-weight: 300;
      color: #000;
      outline: none;
      margin: 10px 0 20px;
    }
    ::placeholder {
      color: #e5e5e5;
    }
    .password_eyes {
      background-color: #ffffff;
      border-radius: 50px;
      border: none;
      font-size: 14px;
      font-weight: 300;
      padding: 0 20px;
      color: #fff;
      display: flex;
      align-items: center;
      input {
        padding: 0 !important;
      }
    }
   
    .login {
      width: 100%;
      background-color: #ffffff;
      color: #080710;
      padding: 15px 0;
      font-size: 18px;
      font-weight: 600;
      border-radius: 50px;
      cursor: pointer;
      border: none;
      margin-top: 3px;
    }
    .center {
      text-align: center;
      padding-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    .signUp {
      float: none;
      margin: 0;
    }
  }
`;
