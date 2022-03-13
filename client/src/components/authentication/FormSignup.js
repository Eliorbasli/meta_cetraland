import React from "react";
import useForm from "./useForm";
import validate from "./validateInfo";
import "./Form.css";
const FormSignup = ({ submitForm }) => {
  const { handleChange, values, handleSubmit, errors } = useForm(
    submitForm,
    validate
  );
  return (
    <div className="form-content-right">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Get started with us today!!!</h1>
        <div className="form-inputs">
          <label htmlFor="userName" className="form-label">
            Username
          </label>
          <input
            id="userName"
            type="text"
            name="userName"
            className="form-input"
            placeholder="Enter your username"
            value={values.userName}
            onChange={handleChange}
          />
          {errors.userName && <p>{errors.userName}</p>}
        </div>
        <div className="form-inputs">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className="form-inputs">
          <label htmlFor="password2" className="form-label">
            Confirm password
          </label>
          <input
            id="password2"
            type="password"
            name="password2"
            className="form-input"
            placeholder="confirm password"
            value={values.password2}
            onChange={handleChange}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button className="form-input-btn" type="submit">
          Sign me up!
        </button>
        <span className="form-input-login">
          Already have an account
          <a href="/login">here</a>
        </span>
      </form>
    </div>
  );
};

export default FormSignup;
