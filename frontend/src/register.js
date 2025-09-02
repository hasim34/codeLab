import React from 'react';
import './register.css';

function Register() {
  return (
    <div className="register-container">
      <form className="register-form">
        <h2 className="register-title">Create Account</h2>

        <input type="text" placeholder="Username" className="register-input" />
        <input type="email" placeholder="Email" className="register-input" />
        <input type="password" placeholder="Password" className="register-input" />

        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default Register;
