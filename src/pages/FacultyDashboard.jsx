import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <div className="text-2xl mb-6 flex justify-between items-center">
          <span>Faculty Dashboard:</span>
          <div className="flex items-center space-x-4">
            <button className="hover:text-gray-300">Profile</button>
            <button className="bg-red-600 px-4 py-1 rounded hover:bg-red-700">Logout</button>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <nav className="mb-8">
          <ul className="flex space-x-6">
            <li>
              <button 
                onClick={() => navigate('/schedule-labs')} 
                className="hover:text-gray-300 hover:underline"
              >
                Schedule Labs
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate('/monitor-labs')} 
                className="hover:text-gray-300 hover:underline"
              >
                Monitor Labs
              </button>
            </li>
            <li><button className="hover:text-gray-300">Grading & Feedback</button></li>
          </ul>
        </nav>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Active Classes */}
          <div className="border border-gray-700 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <span className="mr-2">📋</span>
              <h2>Active Classes</h2>
            </div>
            <div className="h-40 overflow-y-auto"></div>
          </div>

          {/* Upcoming Lab Sessions */}
          <div className="border border-gray-700 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <span className="mr-2">📅</span>
              <h2>Upcoming Lab Sessions</h2>
            </div>
            <div className="h-40 overflow-y-auto"></div>
          </div>

          {/* Assignments Graded */}
          <div className="border border-gray-700 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <span className="mr-2">✓</span>
              <h2>Assignments Graded</h2>
            </div>
            <div className="h-40 overflow-y-auto"></div>
          </div>
        </div>

        {/* Create Assignment Section */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <span className="mr-2">➕</span>
            <h2>Create Assignment</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Title..."
                className="w-full bg-gray-800 border border-gray-700 rounded p-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="flex items-center mb-2">
                <span className="mr-2">📝</span>
                Description:
              </label>
              <textarea
                className="w-full h-32 bg-gray-800 border border-gray-700 rounded p-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="flex items-center mb-2">
                <span className="mr-2">📅</span>
                Due Date:
              </label>
              <input
                type="date"
                className="bg-gray-800 border border-gray-700 rounded p-2"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button className="bg-gray-800 border border-gray-700 rounded px-6 py-2 hover:bg-gray-700">
                Create Assignment
              </button>
              <button className="bg-gray-800 border border-gray-700 rounded px-6 py-2 hover:bg-gray-700">
                View Submissions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
