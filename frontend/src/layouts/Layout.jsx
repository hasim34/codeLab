import { Outlet, NavLink } from "react-router-dom";
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs"; // import breadcrumbs
import "./layout.css";

function Layout() {
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
          {/* <NavLink to="/dashboard/profile">Profile</NavLink> */}
        </nav>

        <div className="topbar-right-icons">
          <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className="topbar-avatar"
          />
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