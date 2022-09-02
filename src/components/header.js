import { Link } from "react-router-dom";

var link;
if (localStorage.getItem("user") === "Admin") {
  link = (
    <Link
      className="logout-link"
      to={"/"}
      type="button"
      onClick={() => {
        handleLogOut();
        window.location.href = "/";
      }}
    >
      Logout
    </Link>
  );
} else {
  link = (
    <h5 className="login-link">
      Are you an admin?{" "}
      <span>
        <Link to={"/login"}>Login</Link>{" "}
      </span>
    </h5>
  );
}

const handleLogOut = () => {
  localStorage.setItem("user", "User");
};

const Header = () => {
  return (
    <div className="header">
      <h2>Task Management</h2>
      {link}
    </div>
  );
};

export default Header;
