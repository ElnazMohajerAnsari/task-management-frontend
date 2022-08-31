import Home from "../pages/home";
import Edit from "../pages/edit";
import Login from "../pages/login";
import SignUp from "../pages/signup";

const routes = [
  {
    component: Home,
    path: "/home",
  },
  {
    component: Edit,
    path: "/edit",
  },
  {
    component: Login,
    path: "/login",
  },
  {
    component: SignUp,
    path: "/signup",
  },
];

export default routes;
