import React, { useState } from "react";
import "./login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page">
      {/* Left Side */}
      <div className="login-left">
        <div className="logo">
          <span className="logo-icon">{"</>"}</span>
          <h1>CodeLab</h1>
        </div>
        <p className="welcome-text">Welcome back to your coding journey</p>

        <div className="login-box">
          <h2>Sign In</h2>
          <p className="subtext">Enter your credentials to access your account</p>

          <form>
            <label>Roll Number / Registration Number</label>
            <input type="text" placeholder="Enter your roll number" />

            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

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
          alt="Coding platform"
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
