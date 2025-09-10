import React from 'react';
import './login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-left">
        <h2 className="welcome-text">Welcome back to your coding journey</h2>
        <div className="login-box">
          <h3>Sign In</h3>
          <p className="instruction">Enter your credentials to access your account</p>
          <input type="text" placeholder="Roll Number / Registration Number" />
          <input type="password" placeholder="Password" />
          <a href="#" className="forgot-link">Forgot password?</a>
          <button className="signin-btn">Sign In</button>
          <p className="signup-prompt">
            Don't have an account? <a href="#">Create one here</a>
          </p>
        </div>
      </div>

         <div className="login-right">
    <img src="https://blog.zegocloud.com/wp-content/uploads/2023/02/coding-platform.jpg" alt="Coding Platform" className="login-image" />
        <p className="caption">
          Master Programming Skills<br />
          Practice lab experiments, solve coding problems, and track your progress in a comprehensive learning environment.
        </p>
      </div>
    </div>
  );
}

export default Login;