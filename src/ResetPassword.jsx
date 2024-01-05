import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { LoginStyle } from "./Login";
import { useFormik } from "formik";
import Loader from "./axoisApi/Loader";
import { toast } from "react-toastify";
import { API } from "./axoisApi/ApiInstance";
const validate = (values) => {
  const errors = {};
  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};
const ResetPassword = () => {
  const { token } = useParams();

  const navigate = useNavigate();
  const [forgetLoader, setForgetLoader] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate,
    onSubmit: async (values, actions) => {
      setForgetLoader(true);
      try {
        if (token) {
          const response = await API.post(
            `/api/auth/reset-password/${token}`,
            values
          );
          if (response.status == 200) {
            toast.success("Password reset successfully check your email");
            navigate("/");
            actions.resetForm({
              values: {
                password: "",
              },
            });
          }
        } else {
          toast.warn("token is mandatory");
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
        <label htmlFor="password">Enter new password:</label>
        <input
          type="password"
          placeholder="Enter new password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}
        <button type="submit" className="login">
          {forgetLoader ? <Loader /> : "reset password"}
        </button>
      </form>
    </LoginStyle>
  );
};
export default ResetPassword;
