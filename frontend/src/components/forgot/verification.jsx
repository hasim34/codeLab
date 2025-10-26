import React, { useState } from "react";
import "./verification.css";
import { useNavigate } from "react-router-dom";

function Verification() {
  const [roll, setRoll] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // <-- Add this
  const [touched, setTouched] = useState(false); // <-- Track first submit
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true); // <-- mark as attempted

    // Validation logic
    if (!roll) {
      setError("Register number is required");
      return;
    }
    if (!/^\d+$/.test(roll)) {
      setError("Register number must be numeric");
      return;
    }
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return;
    }

    setError(""); // <-- Clear error if all good
    alert(`OTP will be sent to your email ${email} for roll no: ${roll}`);
    navigate("/otp"); 
  };

  return (
    <div className="verification-page">
      <div className="verification-box">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label>Register Number</label>
          <input
            type="text"
            placeholder="Enter your register number"
            value={roll}
            onChange={(e) => {
              setRoll(e.target.value);
              if (touched) setError(""); // <-- clear error when typing
            }}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (touched) setError(""); // <-- clear error when typing
            }}
          />

          {error && <p style={{ color: "red" }}>{error}</p>} {/* <-- Show error */}

          <button type="submit" className="verify-btn">
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default Verification;
