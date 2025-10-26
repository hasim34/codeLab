import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forgot-password.css";
import { FaEnvelope, FaLock, FaUser, FaArrowLeft } from "react-icons/fa";

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
  const navigate = useNavigate();

  // Step 1: Verification Validation
  const validateVerification = () => {
    const newErrors = {};
    if (!formData.roll) {
      newErrors.roll = "Register number is required";
    } else if (!/^\d+$/.test(formData.roll)) {
      newErrors.roll = "Register number must be numeric";
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
    } else if (!/^\d{4,6}$/.test(formData.otp)) {
      newErrors.otp = "OTP must be 4-6 digits";
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

  // Handle input changes
  const handleInputChange = (field, value) => {
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

  // Step 1: Verification
  const renderVerificationStep = () => (
    <div className="step-content">
      <div className="icon-circle">
        <FaUser size={28} />
      </div>
      <h2>Forgot Password</h2>
      <p className="subtext">Enter your register number and email to reset your password</p>
      <form onSubmit={handleVerificationSubmit}>
        <label>Register Number</label>
        <input
          type="text"
          placeholder="Enter your register number"
          value={formData.roll}
          onChange={(e) => handleInputChange('roll', e.target.value)}
          disabled={isLoading}
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
            <FaArrowLeft /> Back to Login
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
        <FaEnvelope size={28} />
      </div>
      <h2>Enter OTP</h2>
      <p className="subtext">We've sent a 6-digit code to your email</p>
      <form onSubmit={handleOTPSubmit}>
        <label>OTP</label>
        <input
          type="text"
          placeholder="Enter OTP"
          value={formData.otp}
          onChange={(e) => handleInputChange('otp', e.target.value)}
          disabled={isLoading}
        />
        {errors.otp && <p className="error-text">{errors.otp}</p>}
        
        <div className="button-group">
          <button type="button" className="back-btn" onClick={handleBack} disabled={isLoading}>
            <FaArrowLeft /> Back
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
        <FaLock size={28} />
      </div>
      <h2>Reset Password</h2>
      <p className="subtext">Create a new password for your account</p>
      <form onSubmit={handlePasswordReset}>
        <label>New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          disabled={isLoading}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm new password"
          value={formData.confirm}
          onChange={(e) => handleInputChange('confirm', e.target.value)}
          disabled={isLoading}
        />
        {errors.confirm && <p className="error-text">{errors.confirm}</p>}

        <p className="note">Password must be at least 6 characters long</p>

        <div className="button-group">
          <button type="button" className="back-btn" onClick={handleBack} disabled={isLoading}>
            <FaArrowLeft /> Back
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
        {/* Step indicator removed */}
        {currentStep === 1 && renderVerificationStep()}
        {currentStep === 2 && renderOTPStep()}
        {currentStep === 3 && renderResetStep()}
      </div>
    </div>
  );
}

export default ForgotPassword;