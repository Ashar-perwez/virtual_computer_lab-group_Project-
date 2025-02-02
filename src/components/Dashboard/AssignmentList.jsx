import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AssignmentList = () => {
  // Dummy data for assignments
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "TCP/IP Implementation",
      course: "Computer Networks Lab",
      dueDate: "2025-01-25T14:00",
      description: "Implement basic TCP/IP protocols",
      submissions: 15,
      totalStudents: 45,
      status: "active",
    },
    {
      id: 2,
      title: "Database Normalization",
      course: "Database Systems Lab",
      dueDate: "2025-01-24T16:00",
      description: "Normalize the given database schema",
      submissions: 28,
      totalStudents: 38,
      status: "active",
    },
    {
      id: 3,
      title: "Process Scheduling",
      course: "Operating Systems Lab",
      dueDate: "2025-01-23T11:00",
      description: "Implement different process scheduling algorithms",
      submissions: 42,
      totalStudents: 42,
      status: "completed",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'upcoming':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleViewSubmissions = (assignmentId) => {
    // Navigate to submissions view
    toast.info('Viewing submissions...');
  };

  const handleEditAssignment = (assignmentId) => {
    // Open edit modal/form
    toast.info('Editing assignment...');
  };

  const handleDeleteAssignment = (assignmentId) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(assignments.filter(a => a.id !== assignmentId));
      toast.success('Assignment deleted successfully');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Assignments</h2>
        <div className="flex space-x-2">
          <select 
            className="bg-gray-800 text-white px-4 py-2 rounded"
            defaultValue="all"
          >
            <option value="all">All Assignments</option>
            <option value="active">Active</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div 
            key={assignment.id} 
            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-semibold">{assignment.title}</h3>
                  <span 
                    className={`px-2 py-1 rounded text-xs ${getStatusColor(assignment.status)}`}
                  >
                    {assignment.status}
                  </span>
                </div>
                <p className="text-gray-400 mt-1">{assignment.course}</p>
                <p className="text-sm mt-2">{assignment.description}</p>
                <div className="mt-4 flex items-center space-x-4 text-sm text-gray-400">
                  <span>Due: {formatDate(assignment.dueDate)}</span>
                  <span>Submissions: {assignment.submissions}/{assignment.totalStudents}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleViewSubmissions(assignment.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  View Submissions
                </button>
                <button
                  onClick={() => handleEditAssignment(assignment.id)}
                  className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAssignment(assignment.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 rounded-full h-2"
                style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentList;
