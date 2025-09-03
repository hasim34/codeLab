import React from 'react';
import './login.css';
import { NavLink } from 'react-router-dom';

function Login() {
  return (
    <div className="login-container">
      <form className="login-form">
        <h2 className="login-title">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
        />
        <NavLink to="/dashboard" className="login-button">Login</NavLink>
        <p className="register-link">Don't have an account? <NavLink to="/register" className="register-link-button">Register</NavLink></p>
      </form>
    </div>
  );
}

export default Login;
