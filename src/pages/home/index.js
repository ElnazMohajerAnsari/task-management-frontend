import "../../App.css";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addTasks, deleteTasks } from "../../redux/reducer/app";
import { GoPlus } from "react-icons/go";
import TaskItem from "../../components/TaskItem";
import { useLocation } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    tasks: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (taskObj) => dispatch(addTasks(taskObj)),
    deleteTask: (id) => dispatch(deleteTasks(id)),
  };
};

const Tasks = (props) => {
  const location = useLocation();
  const data = location.state;

  const { deleteTask } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === "") {
      alert("Please enter the title of task");
    } else {
      if (description.length > 10) {
        let id = Math.floor(Math.random() * 1000);
        props.addTask({
          id: id,
          taskTitle: title,
          taskDescription: description + "\n \nHistory: ToDo",
          taskStatus: "ToDo",
        });

        handleAddTask(id);
        setTitle("");
        setDescription("");
      } else {
        alert("A task must have a long description...");
      }
    }
  };

  const handleAddTask = async (id) => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("description", description + "\n \nHistory: ToDo");
    formData.append("status", "ToDo");

    await fetch("http://localhost:8080/CRUD/create", {
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

  async function getRequest(url) {
    let headers = new Headers();
    headers.append("Content-Type", "text/plain");
    const res = await fetch(url, headers);
    console.log(res);
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad response");
    }
  }

  async function getData(url) {
    try {
      const data = await getRequest(url);
      console.log(data);
      handleShowTasks(data);
    } catch (e) {
      console.log(e);
    }
  }

  const handleShowTasks = (data) => {
    data.data.map((task) =>
      props.addTask({
        id: task.id,
        taskTitle: task.title,
        taskDescription: task.description,
        taskStatus: task.status,
      })
    );
  };

  useEffect(() => {
    if (props.tasks.taskReducer.length <= 0) {
      getData("http://localhost:8080/CRUD/read_all");
    } else {
      props.tasks.taskReducer.map((task) => {
        if (data !== undefined) {
          if (data.id === task.id) {
            if (data.title.trim().length === 0) {
              data.title = task.taskTitle;
            }
            if (data.description.trim().length === 0) {
              data.description = task.taskDescription;
            }
            if (data.status.trim().length === 0) {
              data.status = task.taskStatus;
            } else {
              data.description = data.description + " => " + data.status;
            }
            deleteTask(task.id);
            props.addTask({
              id: data.id,
              taskTitle: data.title,
              taskDescription: data.description,
              taskStatus: data.status,
            });
          }
        }
      });
    }
  }, []);

  return (
    <>
      <div className="container">
        <h4>Add a New Task</h4>

        <form className="home-form">
          <div className="input">
            <input
              className="title"
              placeholder="Title"
              name="title"
              type="text"
              onChange={(e) => handleChangeTitle(e)}
              value={title}
            />
          </div>

          <div className="input">
            <textarea
              className="description"
              placeholder="Description"
              name="description"
              onChange={(e) => handleChangeDescription(e)}
              value={description}
            ></textarea>
          </div>

          <button className="button add-btn" onClick={handleSubmit}>
            <GoPlus />
            Add
          </button>
        </form>
        {/* --------------------------------------------------------------- */}
      </div>
      <div className="container2">
        <h4 className="task-list-title">Tasks</h4>
        <div className="task-list">
          {props.tasks.taskReducer.length > 0
            ? props.tasks.taskReducer.map((task) => {
                return (
                  <TaskItem
                    key={task.id}
                    task={task}
                    deleteTask={props.deleteTask}
                    updateTask={props.updateTask}
                  />
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
