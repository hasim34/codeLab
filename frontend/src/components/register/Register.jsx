import React from 'react';
import './Register.css';

function Register() {
    return (
        <div className="register-container">
            {/* Left Panel with welcome message */}
            <div className="left-panel">
                <h2>Welcome to CodeLab</h2>
                <p>Join our community of developers and start your coding journey with us. Create an account to access all features.</p>
            </div>

            {/* Right Panel with registration form */}
            <div className="right-panel">
                <div className="logo">
                    <h1>Code<span>Lab</span></h1>
                </div>

                <div className="form-title">
                    <h2>Create Account</h2>
                    <p>Fill in your details to get started</p>
                </div>

                <form className="register-form">
                    {/* Username Field */}
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <div className="input-with-icon">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-with-icon">
                            <i className="fas fa-envelope"></i>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    {/* Register Number Field - NEW FIELD */}
                    <div className="form-group">
                        <label htmlFor="regnumber">Register Number</label>
                        <div className="input-with-icon">
                            <i className="fas fa-id-card"></i>
                            <input
                                type="text"
                                id="regnumber"
                                placeholder="Enter your register number"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-with-icon">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                id="password"
                                placeholder="Create a password"
                            />
                            <span className="password-toggle">
                                <i className="fas fa-eye"></i>
                            </span>
                        </div>
                    </div>

                    {/* Confirm Password Field - NEW FIELD */}
                    <div className="form-group">
                        <label htmlFor="confirmpassword">Confirm Password</label>
                        <div className="input-with-icon">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                id="confirmpassword"
                                placeholder="Confirm your password"
                            />
                            <span className="password-toggle">
                                <i className="fas fa-eye"></i>
                            </span>
                        </div>
                    </div>

                    {/* Register Button */}
                    <button type="submit" className="btn-register">Create Account</button>

                    {/* Login Link */}
                    <div className="login-link">
                        Already have an account? <a href="/login">Sign in</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;