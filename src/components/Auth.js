import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../utils/converter";

export default function Auth() {
  let [authMode, setAuthMode] = useState("signin");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function getUser() {
      const user = await checkUser();
      if (user) navigate("/");
    }
    getUser();
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    const url = "https://api-certi-portal.herokuapp.com/auth/login";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (response.status === 200) {
      localStorage.setItem("token", responseData.token);
      navigate("/")
    } else console.log("Login failed");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const url = "https://api-certi-portal.herokuapp.com/api/user";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };
    const response = await fetch(url, options);

    if (response.status === 200) {
      console.log("Registered");
      const res = await response.json();
      console.log(res);
      navigate("/login")
      setAuthMode("signin");
      setUsername("")
      setPassword("")
    } else console.log("Login failed");
  };

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleRegister}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
