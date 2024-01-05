import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useFormik } from "formik";
import Login, { LoginStyle } from "./Login";
import Loader from "./axoisApi/Loader";
import { toast } from "react-toastify";
import { API } from "./axoisApi/ApiInstance";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 15) {
    errors.name = "Must be 15 characters or less";
  }
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
const SignUp = () => {
  const navigate = useNavigate();
  const [signLoading, setSignLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      setSignLoading(true);
      try {
        const response = await API.post("/api/auth/signup", values);
        if (response.status == 201) {
          toast.success("Register successfully");
          navigate("/");
        }
        setSignLoading(false);
      } catch (err) {
        if (err?.response?.data?.detail) {
          toast.error(err?.response?.data?.detail);
        } else {
          toast.error("Something went wrong");
        }
        setSignLoading(false);
      }
    },
  });
  return (
    <LoginStyle>
      <form action="" onSubmit={formik.handleSubmit}>
        <h2 className="text-center mb-5 text-white">Sign Up</h2>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          placeholder="Enter a username"
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name ? (
          <div className="error">{formik.errors.name}</div>
        ) : null}
        <label htmlFor="">Email or Phone:</label>
        <input
          type="text"
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
        <input
          type="password"
          placeholder="Enter a password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}

        <button type="submit" className="login" disabled={signLoading}>
          {signLoading ? <Loader /> : "Create Account"}
        </button>
      </form>
    </LoginStyle>
  );
};
export default SignUp;
