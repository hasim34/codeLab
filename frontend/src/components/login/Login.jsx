import React, { useState } from "react";
import "./login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
   const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateForm = (e) => {
    e.preventDefault();

    // Roll number validation (only numbers)
    const rollRegex = /^[0-9]+$/;
    if (!rollRegex.test(rollNumber)) {
      setError("Roll Number / Registration Number must be numbers only.");
      return;
    }

    // Password validation (at least 8 chars, includes number & special char)
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and include a number & special character."
      );
       return;
    }

    setError("");
    alert("Successfully logged in. Let's get started");
  };
  return (
    <div className="login-page">
      {/* Left Side */}
      <div className="login-left">
        <div className="logo">
          <span className="logo-icon">{"</>"}</span>
          <h1 className="logo-text">CodeLab</h1>
        </div>
        <p className="welcome-text">Welcome back to your coding journey</p>

        <div className="login-box">
          <h2>Sign In</h2>
          <p className="subtext">Enter your credentials to access your account</p>

          <form onSubmit={validateForm}>
            <label>Roll Number / Registration Number</label>
          <input
            type="text"
            placeholder="Enter your roll number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />

           <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> 
          
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "" : ""}
              </span>
              {/* Error Message */}
            {error && <p className="error">{error}</p>}

            <a href="#" className="forgot-link">Forgot password?</a>

            <button type="submit" className="signin-btn">Sign In</button>
          </form>

          <p className="signup-text">
            Don’t have an account? <a href="#">Create one here</a>
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="login-right">
        <img
          src="https://blog.zegocloud.com/wp-content/uploads/2023/02/coding-platform.jpg"
          alt="Coding Platform"
          className="side-image"
        />
        <h3>Master Programming Skills</h3>
        <p>
          Practice lab experiments, solve coding problems, and track your
          progress in a comprehensive learning environment.
        </p>
      </div>
    </div>
  );
};

export default Login;
