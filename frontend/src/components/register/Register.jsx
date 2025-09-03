import React from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        navigate("/");
    }
  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
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
