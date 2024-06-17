import React, { useState } from "react";
import DataUpdate from "../DataUpdate/DataUpdate";
import "./login.css";

function Login() {
  const database = [
    {
      username: "user1",
      password: "pass1",
    },
    {
      username: "user2",
      password: "pass2",
    },
  ];
  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const [errorMessages, setErrorMessages] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    var { uname, pass } = document.forms[0];
    const userData = database.find((user) => user.username === uname.value);

    if (userData) {
      if (userData.password !== pass.value) {
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        sessionStorage.setItem("User", userData.username);
        sessionStorage.setItem("Loggedin", "true");
      }
    } else {
      setErrorMessages({ name: "uname", message: errors.uname });
    }
    window.location.reload();
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form">
      {sessionStorage.getItem("Loggedin") ? (
        ""
      ) : (
        <div className="logincontainer">
          <div className="screen">
            <div className="screen__content">
              <form className="login" onSubmit={handleSubmit} method="post">
                <div className="login__field">
                  <i className="login__icon fas fa-user"></i>
                  <input
                    type="text"
                    className="login__input"
                    name="uname"
                    required
                    placeholder="User name"
                  />
                  {renderErrorMessage("uname")}
                </div>

                <div className="login__field">
                  <i className="login__icon fas fa-lock"></i>
                  <input
                    type="password"
                    className="login__input"
                    name="pass"
                    required
                    placeholder="Password"
                  />
                  {renderErrorMessage("pass")}
                </div>

                <button className="button login__submit">
                  <span className="button__text">Log In</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
              </form>
            </div>
            <div className="screen__background">
              <span className="screen__background__shape screen__background__shape4"></span>
              <span className="screen__background__shape screen__background__shape3"></span>
              <span className="screen__background__shape screen__background__shape2"></span>
              <span className="screen__background__shape screen__background__shape1"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  const renderContent = (
    <>
      {!sessionStorage.getItem("Loggedin") ? (
        <div className="container loginAdmin">
          <h2>Admin Login</h2>
        </div>
      ) : (
        <div className="welcomemsg">
          <h5>Welcome Admin</h5>   
          <button className="btn btn-primary" onClick={() => logoutSession()}>
            Logout
          </button>
          <DataUpdate />
        </div>
      )}
    </>
  );

  return (
    <div className="app">
      <div className="login-form">
        {renderContent} {renderForm}
      </div>
    </div>
  );
}

function logoutSession() {
  sessionStorage.removeItem("User");
  sessionStorage.removeItem("Loggedin");
  window.location.reload();
}

export default Login;
