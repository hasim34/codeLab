import React, { useState } from "react";
import "./register.css";
import codelabLogo from "./codelab-logo.png"; // your logo image

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 1: State for form fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    registerNumber: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  // Step 2: Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Step 3: Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.registerNumber ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!formData.agreeToTerms) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    // Proceed with actual registration logic
    console.log("Registration Successful:", formData);
    alert("Account created successfully!");

    // Optionally reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      registerNumber: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    });
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <img
          src="https://wallpapercave.com/wp/wp2234623.jpg"
          alt="Students joining"
          className="register-image"
        />
        <h2>Join the Community</h2>
        <p>
          Start your coding journey with thousands of students. Practice, learn,
          and grow together.
        </p>
      </div>

      <div className="register-right">
        <div className="register-box">
          <div className="register-inner-box">
            <div className="register-header">
  <img src={codelabLogo} alt="CodeLab Logo" className="logo-img" />
  <h1 className="main-title">CodeLab</h1>
  <p className="subheading">Create your account to get started</p>
</div>

<h2 className="form-title">Create Account</h2>
<p className="form-subtitle">Fill in your details to create a new account</p>


            {/* Updated form with handler */}
            <form className="register-form" onSubmit={handleSubmit}>
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />

              <div className="form-row spaced-row">
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="youremail@gmail.com"
                  />
                </div>
                <div>
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>

              <label>Register Number</label>
              <input
                type="text"
                name="registerNumber"
                value={formData.registerNumber}
                onChange={handleChange}
                placeholder="Enter your register number"
              />

              <label>Password</label>
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>

              <label>Confirm Password</label>
              <div className="password-field">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  <i
                    className={`fas ${
                      showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>

              <div className="checkbox-row">
                <input
                  type="checkbox"
                  id="terms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                <label htmlFor="terms">
                  I agree to the{" "}
                  <a href="/terms" target="_blank" rel="noopener noreferrer">
                    Terms and Conditions
                  </a>
                </label>
              </div>

              <button type="submit" className="create-account-btn">
                Create Account
              </button>

              <p className="signin-text">
                Already have an account?{" "}
                <a href="/login">Sign in here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
