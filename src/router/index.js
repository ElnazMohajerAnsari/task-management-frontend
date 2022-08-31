import { Route, Switch } from "react-router-dom";
// import routes from "./routes";
import Home from "../pages/home";
import Edit from "../pages/edit";
import Login from "../pages/login";
import SignUp from "../pages/signup";

const Router = () => {
  return (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/edit" exact>
          <Edit />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
      </Switch>
  );
};

export default Router;
