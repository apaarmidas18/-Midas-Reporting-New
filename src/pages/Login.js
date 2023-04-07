import React from "react";
import { useState, useEffect } from "react";
import Userlogin from "../API/Authentication/Userlogin";
import swal from "sweetalert";
import { useNavigate } from "react-router";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setIsSignIn(true);
    }, 200);
  }, []);

  const toggle = () => {
    setIsSignIn((prevIsSignIn) => !prevIsSignIn);
  };

  //time function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password == "") {
      swal({
        title: "Please enter all fields!",

        text:
          "Look's Like You have Entered Wrong Credentials, Please Check And Try Again.",

        icon: "error",
      });
    } else {
      Userlogin({ username, password, navigate });
    }
  };
  return (
    <>
      <div
        className="container-fluid login-fluid"
        style={{
          backgroundImage: `url(/images/famale.jpg)`,
        }}
      >
        <div class="center">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div class="txt_field">
              <input
                type="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span></span>
              <label>Username</label>
            </div>
            <div class="txt_field">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span></span>
              <label>Password</label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                Remember me
              </label>
            </div>

            <input type="submit" value="Login" />
            <div class="singup_link">
              Not a member? <a href="">Signup</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
