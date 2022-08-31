import React, { useState } from "react";
import "../../App.css";
import { Link, useLocation } from "react-router-dom";

const Edit = () => {
  const location = useLocation();
  const data = location.state;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const new_data = {
    id: data.id,
    title: title,
    description: description,
    status: status,
  };

  const handleEditTask = async (id) => {
    let formData = new FormData();
    formData.append("id", id);

    if (title === "") {
      formData.append("title", data.title);
    } else {
      formData.append("title", title);
    }

    if (status === "") {
      formData.append("status", data.status);
      if (description === "") {
        formData.append("description", data.description);
      } else {
        formData.append("description", description);
      }
    } else {
      formData.append("status", status);
      if (description === "") {
        formData.append("description", data.description + " => " + status);
      } else {
        formData.append("description", description + " => " + status);
      }
    }

    await fetch("http://localhost:8080/CRUD/update", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        console.log(res);
      })
      .catch(() => {
        console.log("error");
      });
  };

  return (
    <div className="container">
      <h4>Edit Task</h4>

      <form className="edit-form">
        <div className="input">
          <input
            className="edit-title"
            placeholder="Title"
            name="edit-title"
            type="text"
            onChange={(e) => handleChangeTitle(e)}
            defaultValue={data.title}
          />
        </div>

        <div className="input">
          <textarea
            className="edit-description"
            placeholder="Description"
            name="edit-description"
            onChange={(e) => handleChangeDescription(e)}
            defaultValue={data.description}
          ></textarea>
        </div>

        <div className="edit-status">
          <select
            className="select-status"
            defaultValue={data.status}
            onChange={handleChangeStatus}
          >
            <option
              value="ToDo"
              disabled={
                status === "InProgress" ||
                status === "Done" ||
                status === "Deployed"
              }
            >
              ToDo
            </option>
            <option value="InProgress" /*disabled={status !== "ToDo"}*/>
              InProgress
            </option>
            <option value="Blocked" disabled={status !== "InProgress"}>
              Blocked
            </option>
            <option value="InQA" disabled={status !== "InProgress"}>
              InQA
            </option>
            <option value="Done" disabled={status !== "InQA"}>
              Done
            </option>
            <option value="Deployed" disabled={status !== "Done"}>
              Deployed
            </option>
          </select>
        </div>

        <div className="buttons-group">

          <Link
            to={{ pathname: "/", state: new_data }}
            type="button"
            onClick={() => {
              handleEditTask(data.id);
            }}
            className="button edit-btn"
          >
            <i id="edit-icon"> + </i>Edit
          </Link>

          <Link to="/" 
            className="button cancle-btn">
            Cancle
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Edit;
