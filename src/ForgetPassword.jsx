import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LoginStyle } from "./Login";
import { useFormik } from "formik";
import Loader from "./axoisApi/Loader";
import { toast } from "react-toastify";
import { API } from "./axoisApi/ApiInstance";
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};
const ForgetPassword = () => {
  const navigate = useNavigate();
  const [forgetLoader, setForgetLoader] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: async (values, actions) => {
      setForgetLoader(true);
      try {
        const response = await API.post("/api/auth/forgotPassword", values);
        if (response.status == 200) {
          toast.success("Password reset successfully check your email");
          actions.resetForm({
            values: {
              email: "",
            },
          });
        }
        setForgetLoader(false);
      } catch (err) {
        if (err?.response?.data?.detail) {
          toast.error(err?.response?.data?.detail);
        } else {
          toast.error("Something went wrong");
        }
        setForgetLoader(false);
      }
    },
  });
  return (
    <LoginStyle>
      <form action="" onSubmit={formik.handleSubmit}>
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
        <button type="submit" className="login">
          {forgetLoader ? <Loader /> : "reset password"}
        </button>
      </form>
    </LoginStyle>
  );
};
export default ForgetPassword;
