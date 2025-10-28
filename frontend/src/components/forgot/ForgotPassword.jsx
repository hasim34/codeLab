import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forgot-password.css";

function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState(1); // 1: Verification, 2: OTP, 3: Reset
  const [formData, setFormData] = useState({
    roll: "",
    email: "",
    otp: "",
    password: "",
    confirm: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Step 1: Verification Validation
  const validateVerification = () => {
    const newErrors = {};
    if (!formData.roll) {
      newErrors.roll = "Register number is required";
    } else if (!/^\d+$/.test(formData.roll)) {
      newErrors.roll = "Register number must be numbers only";
    } else if (formData.roll.length !== 11) {
      newErrors.roll = "Register number must be exactly 11 digits";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    return newErrors;
  };

  // Step 2: OTP Validation
  const validateOTP = () => {
    const newErrors = {};
    if (!formData.otp) {
      newErrors.otp = "OTP is required";
    } else if (!/^\d+$/.test(formData.otp)) {
      newErrors.otp = "OTP must be numbers only";
    } else if (formData.otp.length !== 6) {
      newErrors.otp = "OTP must be exactly 6 digits";
    }
    return newErrors;
  };

  // Step 3: Password Validation
  const validatePassword = () => {
    const newErrors = {};
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.confirm) {
      newErrors.confirm = "Please confirm your password";
    } else if (formData.password !== formData.confirm) {
      newErrors.confirm = "Passwords do not match";
    }
    return newErrors;
  };

  // Handle back button
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      // If on first step, go back to login page
      navigate("/");
    }
  };

  // Handle input changes with validation
  const handleInputChange = (field, value) => {
    // Only allow numbers for roll and otp fields
    if ((field === 'roll' || field === 'otp') && value !== '' && !/^\d+$/.test(value)) {
      return; // Don't update if not a number
    }
    
    // Limit roll number to 11 digits
    if (field === 'roll' && value.length > 11) {
      return;
    }
    
    // Limit OTP to 6 digits
    if (field === 'otp' && value.length > 6) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  // Handle Verification submission
  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    const verificationErrors = validateVerification();
    
    if (Object.keys(verificationErrors).length === 0) {
      setErrors({});
      setIsLoading(true);
      
      // Simulate API call to send OTP
      setTimeout(() => {
        setIsLoading(false);
        setCurrentStep(2);
      }, 1000);
    } else {
      setErrors(verificationErrors);
    }
  };

  // Handle OTP submission
  const handleOTPSubmit = (e) => {
    e.preventDefault();
    const otpErrors = validateOTP();
    
    if (Object.keys(otpErrors).length === 0) {
      setErrors({});
      setIsLoading(true);
      
      // Simulate API call to verify OTP
      setTimeout(() => {
        setIsLoading(false);
        setCurrentStep(3);
      }, 1000);
    } else {
      setErrors(otpErrors);
    }
  };

  // Handle Password Reset
  const handlePasswordReset = (e) => {
    e.preventDefault();
    const passwordErrors = validatePassword();
    
    if (Object.keys(passwordErrors).length === 0) {
      setErrors({});
      setIsLoading(true);
      
      // Simulate API call to reset password
      setTimeout(() => {
        setIsLoading(false);
        alert("Password successfully reset!");
        // Redirect to login page
        navigate("/");
      }, 1000);
    } else {
      setErrors(passwordErrors);
    }
  };

  // White Eye Icon SVG
  const EyeIcon = ({ show }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      {show ? (
        // Eye slash icon (hidden)
        <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
      ) : (
        // Eye icon (visible)
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
      )}
    </svg>
  );

  // Step 1: Verification
  const renderVerificationStep = () => (
    <div className="step-content">
      <div className="icon-circle">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
      <h2>Forgot Password</h2>
      <p className="subtext">Enter your register number and email to reset your password</p>
      <form onSubmit={handleVerificationSubmit}>
        <label>Register Number</label>
        <input
          type="text"
          placeholder="Enter your 11-digit register number"
          value={formData.roll}
          onChange={(e) => handleInputChange('roll', e.target.value)}
          disabled={isLoading}
          maxLength={11}
        />
        {errors.roll && <p className="error-text">{errors.roll}</p>}

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          disabled={isLoading}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <div className="button-group">
          <button type="button" className="back-btn" onClick={handleBack} disabled={isLoading}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" style={{marginRight: '5px'}}>
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Back to Login
          </button>
          <button type="submit" className="action-btn" disabled={isLoading}>
            {isLoading ? "Sending OTP..." : "Send OTP"}
          </button>
        </div>
      </form>
    </div>
  );

  // Step 2: OTP
  const renderOTPStep = () => (
    <div className="step-content">
      <div className="icon-circle">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      </div>
      <h2>Enter OTP</h2>
      <p className="subtext">We've sent a 6-digit code to your email</p>
      <form onSubmit={handleOTPSubmit}>
        <label>OTP</label>
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={formData.otp}
          onChange={(e) => handleInputChange('otp', e.target.value)}
          disabled={isLoading}
          maxLength={6}
        />
        {errors.otp && <p className="error-text">{errors.otp}</p>}
        
        <div className="button-group">
          <button type="button" className="back-btn" onClick={handleBack} disabled={isLoading}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" style={{marginRight: '5px'}}>
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Back
          </button>
          <button type="submit" className="action-btn" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      </form>
    </div>
  );

  // Step 3: Password Reset
  const renderResetStep = () => (
    <div className="step-content">
      <div className="icon-circle">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
        </svg>
      </div>
      <h2>Reset Password</h2>
      <p className="subtext">Create a new password for your account</p>
      <form onSubmit={handlePasswordReset}>
        <label>New Password</label>
        <div className="input-with-icon">
          <span className="input-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#aaa">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
          </span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            disabled={isLoading}
          />
          <span 
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            <EyeIcon show={showPassword} />
          </span>
        </div>
        {errors.password && <p className="error-text">{errors.password}</p>}

        <label>Confirm Password</label>
        <div className="input-with-icon">
          <span className="input-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#aaa">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
          </span>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={formData.confirm}
            onChange={(e) => handleInputChange('confirm', e.target.value)}
            disabled={isLoading}
          />
          <span 
            className="password-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <EyeIcon show={showConfirmPassword} />
          </span>
        </div>
        {errors.confirm && <p className="error-text">{errors.confirm}</p>}

        <p className="note">Password must be at least 6 characters long</p>

        <div className="button-group">
          <button type="button" className="back-btn" onClick={handleBack} disabled={isLoading}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" style={{marginRight: '5px'}}>
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Back
          </button>
          <button type="submit" className="action-btn" disabled={isLoading}>
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-box">
        {currentStep === 1 && renderVerificationStep()}
        {currentStep === 2 && renderOTPStep()}
        {currentStep === 3 && renderResetStep()}
      </div>
    </div>
  );
}

export default ForgotPassword;