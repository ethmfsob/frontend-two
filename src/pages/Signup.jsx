import React, { useState } from "react";
import Layout from "../components/Layout";
import "./styles.css";
import axios from "axios";
// import image1 from "./image1.png";
// import { Col, Container, Row } from "react-bootstrap";

function SignUp() {
  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [parentName, setParentName] = useState();
  const [parentContact, setParentContact] = useState();

  let handleSubmit = (event) => {
    const studentObj = {
      firstName,
      lastName,
      email,
      contact,
      parentName,
      parentContact,
    };
    const url = "http://localhost:5000/students/create-student";
    axios
      .post(url, studentObj)
      .then((res) => {
        if (res.status === 200) {
          alert("student added successfuly");
          window.location.reload();
          
        } else {
          Promise.reject();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    event.preventDefault();
  };

  return (
    <Layout>
      <div className="signup-layout">
        <div className="signup-div">
          <h2>Signup</h2>
          <form className="signup-group" onSubmit={handleSubmit}>
            <div className="signup-input">
              <input
                type="text"
                placeholder="First Name"
                id="firstname"
                onChange={(e) => {
                  setfirstName(e.target.value);
                }}
              />
            </div>
            <div className="signup-input">
              <input
                type="text"
                placeholder="Last Name"
                id="lastname"
                onChange={(e) => {
                  setlastName(e.target.value);
                }}
              />
            </div>
            <div className="signup-input">
              <input
                type="email"
                placeholder="Email Id"
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="signup-input">
              <input
                type="tel"
                placeholder="Contact number"
                id="contact"
                onChange={(e) => {
                  setContact(e.target.value);
                }}
              />
            </div>
            <div className="signup-input">
              <input
                type="text"
                placeholder="Parent's name"
                id="parentname"
                onChange={(e) => {
                  setParentName(e.target.value);
                }}
              />
            </div>
            <div className="signup-input">
              <input
                type="tel"
                placeholder="Parent's contact"
                id="parentcontact"
                onChange={(e) => {
                  setParentContact(e.target.value);
                }}
              />
            </div>
            <div className="signup-btn">
              <button type="submit" id="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default SignUp;
