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

  const [errors, setErrors] = useState({});
  const [fieldStatus, setFieldStatus] = useState({});


  // Step 2: Handle input changes
  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData({
    ...formData,
    [name]: type === "checkbox" ? checked : value,
  });

  // Validate the field as user types
  validateField(name, type === "checkbox" ? checked : value);
};

const validateField = (name, value) => {
  let error = "";
  let isValid = false;

  switch (name) {
    case "fullName":
      if (!value.trim()) {
        error = "Full Name is required.";
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        error = "Full Name should contain only letters and spaces.";
      } else {
        isValid = true;
      }
      break;
    case "email":
      if (!value.trim()) {
        error = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Invalid email format.";
      } else {
        isValid = true;
      }
      break;
    case "phone":
      if (!value.trim()) {
        error = "Phone number is required.";
      } else if (!/^[6-9]\d{9}$/.test(value)) {
        error = "Phone number must start with 6,7,8,9 and be 10 digits.";
      } else {
        isValid = true;
      }
      break;
    case "registerNumber":
      if (!value.trim()) {
        error = "Register number is required.";
      } else if (!/^9176\d{7}$/.test(value)) {
        error = "Register number must start with 9176 and be 11 digits total.";
      } else {
        isValid = true;
      }
      break;
    case "password":
      if (!value) {
        error = "Password is required.";
      } else if (
        !/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(value)
      ) {
        error =
          "Password must be at least 8 characters and include at least one number and one special character.";
      } else {
        isValid = true;
      }
      break;
    case "confirmPassword":
      if (!value) {
        error = "Please confirm your password.";
      } else if (value !== formData.password) {
        error = "Passwords do not match.";
      } else {
        isValid = true;
      }
      break;
    case "agreeToTerms":
      if (!value) {
        error = "You must agree to the terms and conditions.";
      } else {
        isValid = true;
      }
      break;
    default:
      break;
  }

  // Update errors and field status
  setErrors({
    ...errors,
    [name]: error,
  });

  setFieldStatus({
    ...fieldStatus,
    [name]: isValid ? "valid" : error ? "error" : "",
  });
};

  // Step 3: Handle form submission
  const handleSubmit = (e) => {
  e.preventDefault();

  const newErrors = {};

  //  Full Name: only letters and spaces allowed
  if (!formData.fullName.trim()) {
    newErrors.fullName = "Full Name is required.";
  } else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
    newErrors.fullName = "Name should contain only letters and spaces.";
  }

  //  Email: basic email format
  if (!formData.email.trim()) {
    newErrors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Invalid email format.";
  }

//  Phone: must start with 6,7,8,9 and be exactly 10 digits
if (!formData.phone.trim()) {
  newErrors.phone = "Phone number is required.";
} else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
  newErrors.phone = "Must start with 6,7,8,9 and be 10 digits.";
}

// Register Number: must start with 9176 and be exactly 11 digits
if (!formData.registerNumber.trim()) {
  newErrors.registerNumber = "Register number is required.";
} else if (!/^9176\d{7}$/.test(formData.registerNumber)) {
  newErrors.registerNumber = "Must start with 9176 and be 11 digits total.";
}


  //  Password: at least 8 characters, one number, one special character
if (!formData.password) {
  newErrors.password = "Password is required.";
} else if (
  !/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(formData.password)
) {
  newErrors.password =
    "Password must be at least 8 characters and include at least one number and one special character.";
}

//  Confirm Password: match check
if (!formData.confirmPassword) {
  newErrors.confirmPassword = "Please confirm your password.";
} else if (formData.confirmPassword !== formData.password) {
  newErrors.confirmPassword = "Passwords do not match.";
}


  //  Terms Agreement
  if (!formData.agreeToTerms) {
    newErrors.agreeToTerms = "You must agree to the terms and conditions.";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) return;

  alert("Account created successfully!");
  console.log("Registered user:", {
    fullName: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    registerNumber: formData.registerNumber,
  });

  // Reset form
  setFormData({
    fullName: "",
    email: "",
    phone: "",
    registerNumber: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  setErrors({});
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
  <div className="logo-title-row">
    <img src={codelabLogo} alt="CodeLab Logo" className="logo-img" />
    <h1 className="main-title">CodeLab</h1>
  </div>
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
  onInput={(e) => validateField("fullName", e.target.value)}
  className={fieldStatus.fullName === "error" ? "error" : fieldStatus.fullName === "valid" ? "valid" : ""}
  placeholder="Enter your full name"
/>
              {errors.fullName && <p className="error-message">{errors.fullName}</p>}


              <div className="form-row spaced-row">
                <div>
                  <label>Email</label>
<input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  onInput={(e) => validateField("email", e.target.value)}
  className={fieldStatus.email === "error" ? "error" : fieldStatus.email === "valid" ? "valid" : ""}
  placeholder="Enter your email"
/>
{errors.email && <p className="error-message">{errors.email}</p>}

                </div>
                <div>
                  <label>Phone</label>
                  <input
  type="tel"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  onInput={(e) => validateField("phone", e.target.value)}
  className={fieldStatus.phone === "error" ? "error" : fieldStatus.phone === "valid" ? "valid" : ""}
  placeholder="Enter number"
/>
                  {errors.phone && <p className="error-message">{errors.phone}</p>}
                </div>
              </div>

              <label>Register Number</label>
              <input
  type="text"
  name="registerNumber"
  value={formData.registerNumber}
  onChange={handleChange}
  onInput={(e) => validateField("registerNumber", e.target.value)}
  className={fieldStatus.registerNumber === "error" ? "error" : fieldStatus.registerNumber === "valid" ? "valid" : ""}
  placeholder="Enter register number"
/>
              {errors.registerNumber && <p className="error-message">{errors.registerNumber}</p>}

              <label>Password</label>
              <div className="password-field">
                <input
  type={showPassword ? "text" : "password"}
  name="password"
  value={formData.password}
  onChange={handleChange}
  onInput={(e) => validateField("password", e.target.value)}
  className={fieldStatus.password === "error" ? "error" : fieldStatus.password === "valid" ? "valid" : ""}
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
              {errors.password && <p className="error-message">{errors.password}</p>}

              <label>Confirm Password</label>
<div className="password-field">
  <input
    type={showConfirmPassword ? "text" : "password"}
    name="confirmPassword"
    value={formData.confirmPassword}
    onChange={handleChange}
    onInput={(e) => validateField("confirmPassword", e.target.value)}
    className={fieldStatus.confirmPassword === "error" ? "error" : fieldStatus.confirmPassword === "valid" ? "valid" : ""}
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

{/* Move this OUTSIDE the password-field div */}
{errors.confirmPassword && (
  <p className="error-message">{errors.confirmPassword}</p>
)}

              <div className="checkbox-row">
  <label htmlFor="terms" className="checkbox-label">
    <input
      type="checkbox"
      id="terms"
      name="agreeToTerms"
      checked={formData.agreeToTerms}
      onChange={handleChange}
    />
    I agree to the{" "}
    <a href="/terms" target="_blank" rel="noopener noreferrer">
      Terms and Conditions
    </a>
  </label>
</div>


              {errors.agreeToTerms && <p className="error-message">{errors.agreeToTerms}</p>}


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
