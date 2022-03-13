import React, { useState } from "react";
import FormSignup from "./FormSignup";
import FormSuccess from "./FormSuccess";
import "./Form.css";

const Form = () => {
  const [isSubmitting, setisSubmitting] = useState(false);
  function submitForm(user) {
    setisSubmitting(true);
    delete user.password2;
    console.log(user);
    fetch("http://localhost:8080/user/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  }

  return (
    <div className="form-container">
      <div className="form-content-left"></div>
      {!isSubmitting ? <FormSignup submitForm={submitForm} /> : <FormSuccess />}
    </div>
  );
};

export default Form;
