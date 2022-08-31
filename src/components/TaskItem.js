import React from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const TaskItem = (props) => {
  const { task, deleteTask } = props;

  const data = {
    id: task.id,
    title: task.taskTitle,
    description: task.taskDescription,
    status: task.taskStatus,
  };

  const handleDeleteTask = async (id) => {
    let formData = new FormData();
    formData.append("id", id);

    await fetch("http://localhost:8080/CRUD/delete", {
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
    <div key={task.id} className="task-item">
      <div className="task-title">{task.taskTitle}</div>

      <p className="task-description">{task.taskDescription}</p>

      <div className="task-item-btn">
        <button className="task-status" disabled={true}>
          {task.taskStatus}
        </button>

        <Link
          to={{ pathname: "/edit", state: data }}
          className="task-item-edit"
        >
          <AiOutlineEdit />
        </Link>

        <Link
          to="/"
          type="button"
          onClick={() => {
            deleteTask(task.id);
            handleDeleteTask(task.id);
          }}
          className="task-item-delete"
        >
          <AiOutlineDelete />
        </Link>
      </div>
    </div>
  );
};
export default TaskItem;
