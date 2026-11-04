import React, { useEffect, useState } from "react";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import "./AdminLayout.css";

// সাইডবারের মেনু: নতুন পেজ যোগ করতে শুধু এখানে একটা লাইন যোগ করুন
const MENU = [
  { to: "/admin/dashboard", icon: "fa-gauge", label: "Dashboard" },
  { to: "/admin/volunteers", icon: "fa-users", label: "Volunteers" },
  { to: "/admin/gallery", icon: "fa-images", label: "Gallery" },
  { to: "/admin/donations", icon: "fa-hand-holding-dollar", label: "Donations" },
  { to: "/admin/messages", icon: "fa-envelope", label: "Messages" },
  { to: "/admin/activities", icon: "fa-calendar-alt", label: "Activities" },
  { to: "/admin/blogs", icon: "fa-newspaper", label: "Blogs" },
];

// Add Blog / Edit Blog পেজে "Blogs" মেনু হাইলাইট থাকবে
const isMenuActive = (pathname, to) => {
  if (pathname === to || pathname.startsWith(`${to}/`)) return true;
  return to === "/admin/blogs" && /^\/admin\/(add-blog|edit-blog)/.test(pathname);
};

// উপরের শিরোনাম (আগে URL-এর শেষ অংশ দেখাত, ফলে Edit Blog-এ "5 Overview" আসত)
const getPageTitle = (pathname) => {
  if (pathname.startsWith("/admin/add-blog")) return "Add Blog";
  if (pathname.startsWith("/admin/edit-blog")) return "Edit Blog";
  const item = MENU.find((m) => isMenuActive(pathname, m.to));
  return item ? item.label : "Admin";
};

const readAdminData = () => {
  try {
    return JSON.parse(localStorage.getItem("adminData"));
  } catch {
    return null;
  }
};

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation(); // কোন পেজে আছি তা বোঝার জন্য
  const adminData = readAdminData();
  const [menuOpen, setMenuOpen] = useState(false); // মোবাইলে সাইডবার খোলা/বন্ধ
  const closeMenu = () => setMenuOpen(false);

  // মোবাইলে মেনু খোলা থাকলে পেছনের পেজ স্ক্রল হবে না; Esc চাপলে মেনু বন্ধ হবে
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    navigate("/admin/login");
  };

  return (
    <div className="admin-shell">
      {/* Sidebar: কম্পিউটারে সবসময় দেখা যায়, মোবাইলে ☰ বাটনে খোলে */}
      <aside
        id="admin-sidebar"
        className={`admin-sidebar ${menuOpen ? "is-open" : ""}`}
        aria-label="Admin menu"
      >
        <div className="admin-brand">
          <span>AN-NAS ADMIN</span>
          <button
            type="button"
            className="admin-icon-btn admin-close d-lg-none"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>

        <ul className="nav flex-column gap-2">
          {MENU.map((item) => {
            const active = isMenuActive(location.pathname, item.to);
            return (
              <li className="nav-item" key={item.to}>
                <Link
                  to={item.to}
                  className={`nav-link admin-link ${active ? "active" : ""}`}
                  aria-current={active ? "page" : undefined}
                  onClick={closeMenu}
                >
                  <i className={`fa-solid ${item.icon} fa-fw`} aria-hidden="true"></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* মোবাইলে মেনুর পেছনের কালো পর্দা: চাপলে মেনু বন্ধ হয় */}
      {menuOpen && <div className="admin-backdrop d-lg-none" onClick={closeMenu} aria-hidden="true"></div>}

      {/* Main Content Area */}
      <div className="admin-main">
        <header className="admin-topbar">
          <button
            type="button"
            className="admin-icon-btn admin-menu-btn d-lg-none"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="admin-sidebar"
          >
            <i className="fa-solid fa-bars" aria-hidden="true"></i>
          </button>

          <h1 className="admin-title">{getPageTitle(location.pathname)}</h1>

          <span className="admin-hello d-none d-md-inline-flex">
            <i className="fa-solid fa-user-shield" aria-hidden="true"></i>
            Hello, {adminData?.name || "Admin"}
          </span>

          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-danger fw-bold shadow-sm admin-logout"
          >
            <i className="fa-solid fa-right-from-bracket" aria-hidden="true"></i>
            <span className="ms-2">Logout</span>
          </button>
        </header>

        {/* ডাইনামিক পেজগুলো এখানে লোড হবে (Dashboard, Gallery, Volunteers) */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
