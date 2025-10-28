import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";
import axios from "axios";
import "./layout.css";

function Layout() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
    localStorage.removeItem("token");
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <div className="app-layout">
      {/* Top Navigation Bar */}
      <header className="topbar">
        <div className="topbar-logo">
          <span className="topbar-logo-icon">{"</>"}</span>
          <span className="topbar-logo-text">CodeLab</span>
        </div>

        <nav className="topbar-nav-links">
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>

        <div className="topbar-right-icons">
          <div 
            className="topbar-avatar-container"
            onClick={() => setShowDropdown(!showDropdown)}
            ref={dropdownRef}
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              className="topbar-avatar"
            />
            {showDropdown && (
              <div className="profile-dropdown">
                <button onClick={handleLogout} className="dropdown-logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Breadcrumbs section */}
      <Breadcrumbs />

      {/* Page content */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;