import React from "react";
import Login from "./Login";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import Todo from "./todoApp/Todo";
import SignUp from "./SignUp";
import ForgetPassword from "./ForgetPassword";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./ResetPassword";

const PrivatRoute = () => {
  let user = JSON.parse(localStorage.getItem("user"));

  return user && user?.token ? <Outlet /> : <Navigate to="/login" />;
};

const PublicRoute = () => {
  let user = JSON.parse(localStorage.getItem("user"));

  return user && user?.token ? <Navigate to="/todo" /> : <Outlet />;
};

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/todo" element={<PrivatRoute />}>
          <Route path="/todo" element={<Todo />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
