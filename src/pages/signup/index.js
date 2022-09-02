import React from "react";
import "../../App.css";

// const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

class SignUp extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  };

   handleAddUser = async(e) => {
    let formData = new FormData();
    formData.append("firstName", this.state.first_name);
    formData.append("lastName", this.state.last_name);
    formData.append("username", this.state.username);
    formData.append("password", this.state.password);
    
    await fetch('http://localhost:8080/CRUD/signup', {
      method: "POST",
      body: formData,
    })
    .then((res)=> {
      console.log(res);
    })
    .catch(()=>{
      console.log("error");
    })
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <h4>Sign Up</h4>

        <form className="signup-form" action="http://127.0.0.1:8000/create" method="post">

        <div className="input">
            <input
              className="firstName"
              placeholder="First Name"
              name="firstName"
              type="text"
              required="required"
              onChange={this.onChange}
              value={this.state.first_name}
            />
          </div>

          <div className="input">
            <input
              className="lastName"
              placeholder="Last Name"
              name="lastName"
              type="text"
              required="required"
              onChange={this.onChange}
              value={this.state.last_name}
            />
          </div>

          <div className="input">
            <input
              className="signup-username"
              placeholder="Username"
              name="signup-username"
              type="text"
              required="required"
              onChange={this.onChange}
              value={this.state.username}
            />
          </div>

          <div className="input">
            <input
              className="signup-password"
              placeholder="Password"
              name="signup-password"
              type="password"
              required="required"
              onChange={this.onChange}
              value={this.state.password}
            ></input>
          </div>

          <button
            className="button signup-btn"
            onClick={this.handleAddUser}
          >
            <i id="signup-icon"></i>
            Sign Up
          </button>

        </form>
      </div>
    );
  }
}

export default SignUp;
