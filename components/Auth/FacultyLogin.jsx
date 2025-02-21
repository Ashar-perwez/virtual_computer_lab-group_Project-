import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFaculties } from "../../utils/localStorage";

const FacultyLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const faculties = getFaculties();
    const faculty = faculties.find(
      (f) => f.email === formData.email && f.password === formData.password
    );

    setTimeout(() => {
      setLoading(false);
      if (faculty) {
        navigate("/FacultyDashboard");
      } else {
        setError("Invalid email or password.");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <div className="md:w-1/2 bg-purple-600 text-white flex flex-col justify-center items-center p-8">
        <h1 className="text-3xl font-bold mb-4">Faculty Login</h1>
        <p className="text-lg">Sign in to manage your classes and resources.</p>
      </div>

      <div className="md:w-1/2 bg-white flex flex-col justify-center items-center p-8">
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border rounded"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-purple-600 text-white py-2 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <Link to="/forgot-password" className="mt-4 text-purple-600">
          Forgot Password?
        </Link>
        <Link to="/signup?userType=faculty" className="mt-4 text-purple-600">
          Sign up as a faculty
        </Link>
      </div>
    </div>
  );
};

export default FacultyLogin;
