import React from "react";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation(); // কোন পেজে আছি তা বোঝার জন্য
  const adminData = JSON.parse(localStorage.getItem("adminData"));

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    navigate("/admin/login");
  };

  // মেনু অ্যাকটিভ আছে কি না তা চেক করার ফাংশন
  const isActive = (path) =>
    location.pathname === path ? "bg-white text-success" : "text-white";

  return (
    <div
      className="d-flex"
      style={{ minHeight: "100vh", backgroundColor: "#f4f6f9" }}
    >
      {/* Sidebar Section */}
      <div
        className="p-3 shadow-lg"
        style={{ width: "250px", backgroundColor: "#006a4e" }}
      >
        <h4
          className="text-center fw-bold mb-5 mt-3"
          style={{ color: "#f5a623" }}
        >
          AN-NAS ADMIN
        </h4>
        <ul className="nav flex-column gap-3">
          <li className="nav-item">
            <Link
              to="/admin/dashboard"
              className={`nav-link fw-semibold rounded ${isActive("/admin/dashboard")}`}
            >
              <i className="fa-solid fa-gauge me-2"></i> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/volunteers"
              className={`nav-link fw-semibold rounded ${isActive("/admin/volunteers")}`}
            >
              <i className="fa-solid fa-users me-2"></i> Volunteers
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/gallery"
              className={`nav-link fw-semibold rounded ${isActive("/admin/gallery")}`}
            >
              <i className="fa-solid fa-images me-2"></i> Gallery
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/donations"
              className={`nav-link fw-semibold rounded ${isActive("/admin/donations")}`}
            >
              <i className="fa-solid fa-hand-holding-dollar me-2"></i> Donations
            </Link>
          </li>
          <li className="nav-item">
    <Link to="/admin/messages" className={`nav-link fw-semibold rounded ${isActive('/admin/messages')}`}>
        <i className="fa-solid fa-envelope me-2"></i> Messages
    </Link>
</li>
          <li className="nav-item">
            <Link
              to="/admin/activities"
              className={`nav-link fw-semibold rounded ${isActive("/admin/activities")}`}
            >
              <i className="fa-solid fa-calendar-alt me-2"></i> Activities
            </Link>
          </li>
               <li className="nav-item">
    <Link
        to="/admin/blogs"
        className={`nav-link fw-semibold rounded ${isActive("/admin/blogs")}`}
    >
        <i className="fa-solid fa-newspaper me-2"></i> Blogs
    </Link>
</li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 overflow-auto" style={{ height: "100vh" }}>
        {/* Top Navbar */}
        <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4 py-3 sticky-top">
          <div className="container-fluid">
            <h4 className="mb-0 fw-bold theme-text text-capitalize">
              {location.pathname.split("/").pop()} Overview
            </h4>
            <div className="d-flex align-items-center gap-4">
              <span className="fw-semibold text-muted">
                <i className="fa-solid fa-user-shield me-2"></i>
                Hello, {adminData?.name || "Admin"}
              </span>
              <button
                onClick={handleLogout}
                className="btn btn-danger px-4 fw-bold shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* ডাইনামিক পেজগুলো এখানে লোড হবে (Dashboard, Gallery, Volunteers) */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
