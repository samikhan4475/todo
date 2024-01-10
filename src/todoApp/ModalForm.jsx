import React from "react";
import { useFormik } from "formik";
import { Paper } from "@mui/material";
import styled from "styled-components";
import { IoIosClose } from "react-icons/io";
import { Button } from "react-bootstrap";
const ModalForm = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      descreption: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = "Title is required";
      }
      if (!values.descreption) {
        errors.descreption = "Description is required";
      }
      return errors;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <FormModal>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
        </div>
        {formik.errors.title ? (
          <div className="error">{formik.errors.title}</div>
        ) : null}
        <div className="d-flex flex-column">
          <label htmlFor="descreption">Description:</label>
          <textarea
            id="descreption"
            name="descreption"
            onChange={formik.handleChange}
            value={formik.values.descreption}
          />
        </div>
        {formik.errors.descreption ? (
          <div className="error">{formik.errors.descreption}</div>
        ) : null}
        <Button type="submit" variant="primary" className="w-50 mt-3">
          Add Value
        </Button>
      </form>
    </FormModal>
  );
};

export default ModalForm;
export const FormModal = styled.div`
  display: flex;
  flex-direction: column;
  input {
    width: 100%;
    padding: 5px 10px;
    margin: 9px 0;
  }
  textarea {
    width: 100%;
    padding: 20px 10px;
    margin: 9px 0;
  }
  .error {
    color: red;
  }
`;
