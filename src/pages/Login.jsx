import React, { useState } from "react";
import Layout from "../components/Layout";
import "./styles.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState();
  // const [contact, setContact] = useState();

  const handleSubmit = () => {
    const url = "http://localhost:5000/students/login";
    const loginObj = { email };
    axios
      .post(url, loginObj)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
      <div className="login-layout">
        <div className="login-div">
          <h2>Login</h2>
          <form className="login-group" onSubmit={handleSubmit}>
            {/* <div className="login-input">
              <input type="text" placeholder="Name" />
            </div> */}
            <div className="login-input">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            {/* <div className="login-input">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setContact(e.target.value);
                }}
              />
            </div>
            <a href="replace-this">Forgot password?</a> */}

            <div className="login-btn">
              <button type="submit">Login</button>
              <Link to={`/signup`}>
                <button type="button" id="login-btn-signup">
                  SignUp
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
