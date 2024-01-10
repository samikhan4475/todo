import React, { useState } from "react";
import styled from "styled-components";
import ButtonData from "./buttonData";
import { FaPlus } from "react-icons/fa6";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import Login from "../Login";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ModalForm from "./ModalForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const Todo = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(1);
  const [value, setValue] = useState("");
  const [index, setIndex] = useState("");
  const [check, setCheck] = useState("");
  const [todo, setTodo] = useState([]);
  const [show, setShow] = useState(false);
  const handleClick = (item) => {
    setTab(item);
  };
  const handleAdd = () => {
    if (value.length === 0) return;
    if (index?.toString()) {
      const editedTodos = [...todo];
      editedTodos[index] = value;
      setTodo(editedTodos);
      setIndex("");
    } else {
      setTodo((editedTodos) => [value, ...editedTodos]);
    }
    setValue("");
  };
  const handleDel = (ind) => {
    const delTodo = [...todo];
    delTodo.splice(ind, 1);
    setTodo(delTodo);
    // const filterArr = delTodo.filter((item) => item !== ind);
    // setTodo(filterArr);
  };
  const handleEdit = (ind) => {
    const editTodo = [...todo];
    setValue(editTodo[ind]);
    setIndex(ind);
  };
  const handleLogOut = () => {
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <TodoStyle>
        <button className="logout" onClick={handleLogOut}>
          LogOut
        </button>
        <div className="todo">
          <div className="container pt-5 bt-5">
            <div className="row  gap-2 py-3 px-3">
              {/* <div className="col-12">
                <input
                  type="text"
                  class="form-control input shadow-none border px-3 py-2"
                  placeholder="New Todo"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div> */}
              <div className="col-12">
                <Button
                  variant="info"
                  // onClick={handleAdd}
                  onClick={handleShow}
                  className="text-white w-25"
                >
                  <FaPlus /> Add Task
                </Button>
              </div>
            </div>
            <h1 className="display-5 text-center py-2 text-white">TodoList</h1>
            <div className="row mb-5">
              {ButtonData.map((item, ind) => (
                <div className="col-4" key={ind}>
                  <Button
                    onClick={() => handleClick(item.id)}
                    variant="info"
                    size="lg"
                    className="text-white"
                    block
                  >
                    {item.title}
                  </Button>
                </div>
              ))}
            </div>
            <div className="d-grid gap-3 map">
              {/* <CustomizedTables /> */}

              {todo.map((el, ind) => (
                <div
                  className="col-12 d-flex align-items-center justify-content-between border p-2"
                  key={ind}
                >
                  <div>
                    <p className="m-0 px-3 text-white">{el}</p>
                  </div>
                  <div className="d-flex align-items-center  gap-2 cursor-pointer">
                    <input type="checkbox" className="check m-0" />
                    <MdDelete
                      className="del"
                      onClick={() => handleDel(ind)}
                    />{" "}
                    <MdModeEditOutline
                      className="edit"
                      onClick={() => handleEdit(ind)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <Button variant="danger">Delte done task </Button>
            </div>
            <div className="col-6">
              <Button variant="danger" onClick={() => setTodo([])}>
                Delte all task{" "}
              </Button>
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
          <Modal.Header closeButton>
            <Modal.Title>Todo </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <ModalForm />
          </Modal.Body>
        </Modal>
      </TodoStyle>
    </>
  );
};
export default Todo;
export const TodoStyle = styled.div`
  background-color: #080710;
  padding: 79px 0;
  .logout {
    float: right;
    margin: -50px 30px 0 0;
    width: 10%;
    padding: 5px;
    border-radius: 50px;
    border: none;
    @media screen and (max-width: 575px) {
      width: 25%;
    }
  }
  .todo {
    background-color: rgba(255, 255, 255, 0.13);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    width: 50%;
    margin: 50px auto;
    padding: 20px 30px;
    @media screen and (max-width: 576px) {
      width: 90%;
    }
  }
  .del {
    color: red;
    cursor: pointer;
  }
  .edit {
    color: yellow;
    cursor: pointer;
  }
  .input {
    border-radius: 0;
  }
  button {
    width: 100%;
    font-size: 15px;
  }
  h1 {
    font-size: 22px;
    font-weight: 600;
  }
  .check {
    width: 12px;
    height: 12px;
  }
  p {
    font-size: 15px;
    font-weight: 600;
  }
`;
