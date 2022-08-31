import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <h2>Task Management</h2>
      <h5 className="login-link">
        Are you an admin?{" "}
        <span>
          <Link to={"/login"}>
            Login
          </Link>{" "}
        </span>
      </h5>
    </div>
  );
};

export default Header;
