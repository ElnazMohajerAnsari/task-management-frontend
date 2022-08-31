import React, { useState } from "react";
import "../../App.css";
import { useHistory } from "react-router-dom";
// import { useDispatch } from 'react-redux'

const Login = () => {
  // const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    if (username === "" || password === "") {
      alert("Please fill in all the fields");
      setUsername("");
      setPassword("");
    } else {
      handleLogin();
    }
  };

  const handleLogin = async (e) => {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    console.log(...formData);

    const result = await fetch("http://localhost:8080/CRUD/login", {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        console.log(res);
        return await res.json();
      })
      .catch(() => {
        console.log("error");
      });

    //console.log(result);

    if (result === "Admin") {
      //dispatch({type: "ADMIN", payload: result});
      setUsername("");
      setPassword("");
      history.push("/");
    } else {
      alert("Invalid Input!");
    }
  };

  return (
    <div className="container">
      <h4>Login</h4>

      <div className="login-form">
        <div className="input">
          <input
            className="login-username"
            placeholder="Username"
            name="login-username"
            type="text"
            required="required"
            onChange={(e) => handleChangeUsername(e)}
            value={username}
          />
        </div>

        <div className="input">
          <input
            className="login-password"
            placeholder="Password"
            name="login-password"
            type="password"
            required="required"
            onChange={(e) => handleChangePassword(e)}
            value={password}
          ></input>
        </div>

        <button
          className="button login-btn"
          name="login-user"
          onClick={handleSubmit}
        >
          Login
        </button>

      </div>
    </div>
  );
};

export default Login;
