import { BrowserRouter, Route } from "react-router-dom";
import Login from "./login/login";
import EditData from "./DataUpdate/EditData";

const LoginAction = () => {
  return (
    <>
      <BrowserRouter>
        <Route path="/Login" component={Login} />
        <Route path="/update/:id" component={EditData} />
      </BrowserRouter>
    </>
  );
};

export default LoginAction;
