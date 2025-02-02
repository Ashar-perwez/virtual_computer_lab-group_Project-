import React, { useState } from 'react';
import { toast } from 'react-toastify';

const FacultyProfile = () => {
  const [profile, setProfile] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@university.edu",
    department: "Computer Science",
    designation: "Associate Professor",
    specialization: "Computer Networks",
    joinedDate: "2020-01-15",
    contactNumber: "+1 (555) 123-4567",
    officeHours: "Mon-Fri, 2:00 PM - 4:00 PM"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the profile
    setProfile(editedProfile);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Faculty Profile</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          {!isEditing ? (
            <>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-400">Name</label>
                      <p className="text-lg">{profile.name}</p>
                    </div>
                    <div>
                      <label className="text-gray-400">Email</label>
                      <p className="text-lg">{profile.email}</p>
                    </div>
                    <div>
                      <label className="text-gray-400">Contact Number</label>
                      <p className="text-lg">{profile.contactNumber}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Academic Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-400">Department</label>
                      <p className="text-lg">{profile.department}</p>
                    </div>
                    <div>
                      <label className="text-gray-400">Designation</label>
                      <p className="text-lg">{profile.designation}</p>
                    </div>
                    <div>
                      <label className="text-gray-400">Specialization</label>
                      <p className="text-lg">{profile.specialization}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-gray-400">Joined Date</label>
                    <p className="text-lg">{profile.joinedDate}</p>
                  </div>
                  <div>
                    <label className="text-gray-400">Office Hours</label>
                    <p className="text-lg">{profile.officeHours}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="mt-8 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editedProfile.name}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 rounded p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={editedProfile.email}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 rounded p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Contact Number</label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={editedProfile.contactNumber}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 rounded p-2"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Academic Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 mb-1">Department</label>
                      <input
                        type="text"
                        name="department"
                        value={editedProfile.department}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 rounded p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Designation</label>
                      <input
                        type="text"
                        name="designation"
                        value={editedProfile.designation}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 rounded p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Specialization</label>
                      <input
                        type="text"
                        name="specialization"
                        value={editedProfile.specialization}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 rounded p-2"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 mb-1">Joined Date</label>
                    <input
                      type="date"
                      name="joinedDate"
                      value={editedProfile.joinedDate}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">Office Hours</label>
                    <input
                      type="text"
                      name="officeHours"
                      value={editedProfile.officeHours}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 rounded p-2"
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedProfile(profile);
                  }}
                  className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
