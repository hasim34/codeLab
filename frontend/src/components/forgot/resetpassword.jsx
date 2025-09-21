import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import "./resetpassword.css";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");       // <-- Add error state
  const [touched, setTouched] = useState(false); // <-- Track first submit
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true); // <-- mark form as submitted once

    // Validation logic
    if (!password || !confirm) {
      setError("Both password fields are required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setError(""); // Clear errors
    alert("Password successfully reset (demo only)");
    navigate("/"); // Navigate back to login or homepage
  };

  return (
    <div className="reset-page">
      <div className="reset-box">
        <div className="icon-circle">
          <FaLock size={28} />
        </div>

        <h2>Reset Password</h2>
        <p className="subtext">Create a new password for your account</p>
        <form onSubmit={handleSubmit}>
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (touched) setError(""); // <-- clear error while typing
            }}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
              if (touched) setError(""); // <-- clear error while typing
            }}
          />

          {error && <p style={{ color: "red" }}>{error}</p>} {/* <-- Show error */}
            <p className="note">Password must be at least 8 characters long</p>
          <button type="submit" className="reset-btn">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reset;
