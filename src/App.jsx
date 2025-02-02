import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Landing_Navbar from "../src/components/Landing_Navbar"
import Home from "../src/pages/Home";
import About from "../src/pages/About";
import Resources from "../src/pages/Resources";
import Contact from "../src/pages/Contact"; // Added import statement
import StudentLogin from "../src/components/Auth/StudentLogin";
import FacultyLogin from "../src/components/Auth/FacultyLogin";
import Signup from "../src/components/Auth/Signup";
import FacultyDashboard from "../src/pages/FacultyDashboard";
import FacultyProfile from "../src/components/Dashboard/FacultyProfile";
import Footer from "../src/components/Footer";
import ForgotPassword from "../src/components/Auth/ForgetPassword";
import StudentDashboard from "../src/pages/StudentDashboard";
import ScheduleLab from "../src/components/Dashboard/ScheduleLab";
import CodingInterface from "../src/components/CodingInterface";
import ScheduleLabs from "../src/components/ScheduleLabs";
import MonitorLabs from "../src/components/MonitorLabs";

const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Landing_Navbar />
              <Home />
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div>
              <Landing_Navbar />
              <About />
            </div>
          }
        />
        <Route
          path="/resources"
          element={
            <div>
              <Landing_Navbar />
              <Resources />
            </div>
          }
        />
        <Route
          path="/contact"
          element={
            <div>
              <Landing_Navbar />
              <Contact />
            </div>
          }
        />
        <Route
          path="/student-login"
          element={
            <div>
              <Landing_Navbar />
              <StudentLogin />
            </div>
          }
        />
        <Route
          path="/faculty-login"
          element={
            <div>
              <Landing_Navbar />
              <FacultyLogin />
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <div>
              <Landing_Navbar />
              <Signup />
            </div>
          }
        />
        <Route path="/facultydashboard" element={<FacultyDashboard />} />
        <Route path="/faculty-profile" element={<FacultyProfile />} />
        <Route path="/schedule-labs" element={<ScheduleLabs />} />
        <Route path="/monitor-labs" element={<MonitorLabs />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route
          path="/forgot-password"
          element={
            <div>
              <Landing_Navbar />
              <ForgotPassword />
            </div>
          }
        />
        <Route path="/schedule-lab" element={<ScheduleLab />} />
        <Route path="/coding-interface" element={<CodingInterface />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
