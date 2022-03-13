import React, { useState } from "react";
import "./Form.css";

const Login = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    });

    const data = await response.json();
    console.log("in loginUser function, client side, data_user:");
    console.log(data.userName);

    if (data.userName) {
      localStorage.removeItem("token");
      localStorage.setItem("userId", data._id);
      localStorage.setItem("token", data.userName);
      localStorage.setItem("money", data.money);
      alert("Login successful");
      window.location.href = "/map";
    } else {
      alert("Please check your username and password");
      console.log(data);
      //window.location.href = '/login'
    }

    console.log(data);
  }

  return (
    <div className="form-container">
      <div className="form-content-left">
        <form className="form" onSubmit={loginUser}>
          <h1>Login</h1>
          <div className="form-inputs">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              value={userName}
              className="form-input"
              placeholder="Enter your username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

          <div className="form-inputs">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input type="submit" className="form-input-btn" value="Login"></input>
          <span className="form-input-login">
            <a href="/sign-up" id="linkTo">
              Create new account{" "}
            </a>
          </span>
        </form>
      </div>

      <div className="form-content-right"></div>
    </div>
  );
};

export default Login;
