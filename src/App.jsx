import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// কম্পোনেন্টগুলো ইমপোর্ট করা
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Donation from './pages/Donation';
import Contact from './pages/Contact';
import About from './pages/About'; 
import Volunteer from './pages/Volunteer';
import FundDetails from './pages/FundDetails';
import PaymentResult from './pages/PaymentResult';
import Activities from './pages/Activities';
import Gallery from './pages/Gallery';
import Blogs from './pages/Blogs'; // সাধারণ ইউজারদের জন্য ব্লগ পেজ

import Register from './pages/admin/Register';
import Login from './pages/admin/Login';
import ProtectedRoute from './pages/admin/ProtectedRoute';
import Dashboard from './pages/admin/Dashboard';
import AdminGallery from './pages/admin/AdminGallery';
import AdminVolunteers from './pages/admin/AdminVolunteers';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDonations from './pages/admin/AdminDonations';
import AdminActivities from './pages/admin/AdminActivities';
import AdminMessages from './pages/admin/AdminMessages';
import AddBlog from './pages/admin/AddBlog'; 
import AdminBlogs from './pages/admin/AdminBlogs';
import EditBlog from './pages/admin/EditBlog';

// Frontend এর জন্য একটি লেআউট তৈরি করা হলো (যেখানে হেডার-ফুটার থাকবে)
const FrontendLayout = () => {
    return (
        <>
            <Header />
            <Outlet /> {/* মাঝখানের সাধারণ পেজগুলো এখানে লোড হবে */}
            <Footer />
            <WhatsAppButton />
        </>
    );
};

function App() {
  return (
    <Router>
      <Routes>
        
        {/* ==============================
            Frontend Routes 
            (যাদের Header/Footer লাগবে) 
        ============================== */}
        <Route element={<FrontendLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/donation" element={<Donation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/fund/:fundName" element={<FundDetails />} />
            <Route path="/donation/result" element={<PaymentResult />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blogs" element={<Blogs />} /> 
            <Route path="/news" element={<Blogs />} />
        </Route>

        
        {/* ==============================
            Admin Routes 
            (যাদের মেইন Header/Footer লাগবে না) 
        ============================== */}
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/login" element={<Login />} />

        {/* Admin Layout (Protected) - এর ভেতরে সব পেজ থাকবে */}
        <Route 
            path="/admin" 
            element={
                <ProtectedRoute>
                    <AdminLayout />
                </ProtectedRoute>
            }
        >
            {/* AdminLayout এর <Outlet /> এর জায়গায় এগুলো লোড হবে */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="volunteers" element={<AdminVolunteers />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="donations" element={<AdminDonations />} />
            <Route path="activities" element={<AdminActivities />} />
            <Route path="messages" element={<AdminMessages />} />
            
            {/* ব্লগের অ্যাডমিন রাউটগুলো এখানে থাকবে */}
            <Route path="add-blog" element={<AddBlog />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="edit-blog/:id" element={<EditBlog />} />
            
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;