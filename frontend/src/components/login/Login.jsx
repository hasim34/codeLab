import React from 'react';
import './login.css';
import { NavLink } from 'react-router-dom';

function Login() {
  return (
    <div className="login-container">
      <form className="login-form">
        <h2 className="login-title">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
        />
        <NavLink to="/dashboard" className="login-button">Login</NavLink>
        <p className="register-link">Don't have an account? <NavLink to="/register" className="register-link-button">Register</NavLink></p>
      </form>
    </div>
  );
}

export default Login; 


// import React, { useState } from "react";
// import "./login.css";
// import axios from "axios";
// import { useNavigate, NavLink } from "react-router-dom";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
//         username,
//         password,
//       });

//       // token backend la irunthu varum
//       localStorage.setItem("token", res.data.token);

//       // dashboard ku redirect pannunga
//       navigate("/dashboard");
//     } catch (err) {
//       setError("Invalid username or password");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="login-container">
//       <form className="login-form" onSubmit={handleSubmit}>
//         <h2 className="login-title">Login</h2>

//         <input
//           type="text"
//           placeholder="Username"
//           className="login-input"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="login-input"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit" className="login-button">
//           Login
//         </button>

//         {error && <p className="error-text">{error}</p>}

//         <p className="register-link">
//           Don't have an account?{" "}
//           <NavLink to="/register" className="register-link-button">
//             Register
//           </NavLink>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Login;
