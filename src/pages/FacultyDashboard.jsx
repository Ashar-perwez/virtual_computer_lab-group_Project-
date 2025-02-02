import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import AssignmentList from "../components/Dashboard/AssignmentList";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  // Dummy data for active classes
  const activeClasses = [
    { id: 1, name: "Computer Networks Lab", students: 45, time: "Monday 10:00 AM" },
    { id: 2, name: "Database Systems Lab", students: 38, time: "Tuesday 2:00 PM" },
    { id: 3, name: "Operating Systems Lab", students: 42, time: "Wednesday 11:00 AM" },
  ];

  // Dummy data for upcoming labs
  const upcomingLabs = [
    { id: 1, title: "TCP/IP Implementation", date: "2025-01-23", time: "10:00 AM", students: 45 },
    { id: 2, title: "SQL Queries Advanced", date: "2025-01-24", time: "2:00 PM", students: 38 },
    { id: 3, title: "Process Scheduling", date: "2025-01-25", time: "11:00 AM", students: 42 },
  ];

  // Dummy data for graded assignments
  const gradedAssignments = [
    { id: 1, title: "Network Protocols", submitted: 45, graded: 45, avgScore: 85 },
    { id: 2, title: "Database Design", submitted: 38, graded: 35, avgScore: 78 },
    { id: 3, title: "Memory Management", submitted: 42, graded: 40, avgScore: 82 },
  ];

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    if (!title || !description || !dueDate || !selectedCourse) {
      toast.error("Please fill all fields");
      return;
    }
    
    // Here you would typically make an API call to create the assignment
    toast.success("Assignment created successfully!");
    
    // Reset form
    setTitle("");
    setDescription("");
    setDueDate("");
    setSelectedCourse("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <div className="text-2xl mb-6 flex justify-between items-center">
          <span>Faculty Dashboard</span>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/faculty-profile')} 
              className="hover:text-gray-300"
            >
              Profile
            </button>
            <button 
              onClick={() => {
                navigate('/');
                // Here you would typically call a logout function
                toast.success("Logged out successfully!");
              }} 
              className="bg-red-600 px-4 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <nav className="mb-8">
          <ul className="flex space-x-6">
            <li>
              <button 
                onClick={() => navigate('/schedule-labs')} 
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Schedule Labs
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate('/monitor-labs')} 
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Monitor Labs
              </button>
            </li>
            <li>
              <button 
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                onClick={() => navigate('/grading')}
              >
                Grading & Feedback
              </button>
            </li>
          </ul>
        </nav>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Active Classes */}
          <div className="border border-gray-700 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="mr-2">📋</span>
              <h2 className="text-xl font-semibold">Active Classes</h2>
            </div>
            <div className="space-y-4">
              {activeClasses.map((cls) => (
                <div key={cls.id} className="bg-gray-800 p-3 rounded-lg">
                  <h3 className="font-medium">{cls.name}</h3>
                  <div className="text-sm text-gray-400 mt-1">
                    <p>{cls.students} students enrolled</p>
                    <p>{cls.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Lab Sessions */}
          <div className="border border-gray-700 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="mr-2">📅</span>
              <h2 className="text-xl font-semibold">Upcoming Labs</h2>
            </div>
            <div className="space-y-4">
              {upcomingLabs.map((lab) => (
                <div key={lab.id} className="bg-gray-800 p-3 rounded-lg">
                  <h3 className="font-medium">{lab.title}</h3>
                  <div className="text-sm text-gray-400 mt-1">
                    <p>Date: {lab.date}</p>
                    <p>Time: {lab.time}</p>
                    <p>{lab.students} students</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assignments Graded */}
          <div className="border border-gray-700 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="mr-2">✓</span>
              <h2 className="text-xl font-semibold">Recent Assignments</h2>
            </div>
            <div className="space-y-4">
              {gradedAssignments.map((assignment) => (
                <div key={assignment.id} className="bg-gray-800 p-3 rounded-lg">
                  <h3 className="font-medium">{assignment.title}</h3>
                  <div className="text-sm text-gray-400 mt-1">
                    <p>Submitted: {assignment.submitted}</p>
                    <p>Graded: {assignment.graded}</p>
                    <p>Avg. Score: {assignment.avgScore}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Create Assignment Section */}
        <div className="border border-gray-700 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <span className="mr-2">➕</span>
            <h2 className="text-xl font-semibold">Create Assignment</h2>
          </div>
          
          <form onSubmit={handleCreateAssignment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Course</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded p-2"
              >
                <option value="">Select a course</option>
                {activeClasses.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                placeholder="Assignment title..."
                className="w-full bg-gray-800 border border-gray-700 rounded p-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="w-full h-32 bg-gray-800 border border-gray-700 rounded p-2"
                placeholder="Assignment description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input
                type="datetime-local"
                className="w-full bg-gray-800 border border-gray-700 rounded p-2"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Create Assignment
            </button>
          </form>
        </div>

        {/* Full Assignment List */}
        <div className="mt-8">
          <AssignmentList />
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
