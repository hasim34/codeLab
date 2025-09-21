import React, { useState } from "react";
import "./otp.css";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function OTP() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");       // <-- Add error state
  const [touched, setTouched] = useState(false); // <-- Track first submit
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true); // <-- mark form as submitted once

    // Validation logic
    if (!otp) {
      setError("OTP is required");
      return;
    }
    if (!/^\d{4,6}$/.test(otp)) { // assuming OTP 4-6 digits
      setError("OTP must be 4-6 digits");
      return;
    }

    setError(""); // <-- Clear error if valid
    alert(`OTP entered: ${otp}`);
    navigate("/reset"); // Navigate to ResetPassword page
  };

  return (
    <div className="otp-page">
      <div className="otp-box">
        <div className="icon-circle">
          <FaEnvelope size={28} />
        </div>
        <h2>Enter OTP</h2>
        <p className="subtext">We’ve sent a 6-digit code to your email</p>
        <form onSubmit={handleSubmit}>
          <label>OTP</label>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              if (touched) setError(""); // <-- clear error while typing
            }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>} {/* <-- Show error */}
          <button type="submit" className="otp-btn">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default OTP;
