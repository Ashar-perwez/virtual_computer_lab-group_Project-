import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import labService from '../services/labService';

const BATCH_OPTIONS = ['CSE-A', 'CSE-B', 'CSE-C', 'CSE-D'];

const FormField = ({ label, children }) => (
  <div>
    <label className="block mb-2">{label}</label>
    {children}
  </div>
);

const ScheduleLabs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    labName: '',
    description: '',
    startTime: '',
    endTime: '',
    batch: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { labName, description, startTime, endTime, batch } = formData;
    if (!labName || !description || !startTime || !endTime || !batch) {
      setError('Please fill in all fields');
      return false;
    }

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    const currentDate = new Date('2024-12-26T09:06:33+05:30');

    if (startDate < currentDate) {
      setError('Start time cannot be in the past');
      return false;
    }

    if (startDate >= endDate) {
      setError('End time must be after start time');
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setFormData({
      labName: '',
      description: '',
      startTime: '',
      endTime: '',
      batch: ''
    });
    setError('');
    setSuccess('');
  };

  const handleScheduleLab = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    try {
      const labData = {
        name: formData.labName,
        description: formData.description,
        startTime: new Date(formData.startTime).toISOString(),
        endTime: new Date(formData.endTime).toISOString(),
        batch: formData.batch,
        status: 'scheduled'
      };

      await labService.scheduleLab(labData);
      setSuccess('Lab scheduled successfully!');
      resetForm();
    } catch (err) {
      setError(err.message || 'Failed to schedule lab');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Schedule Lab</h2>
          <button
            onClick={() => navigate('/facultydashboard')}
            className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
          >
            Back to Dashboard
          </button>
        </div>

        {error && (
          <div className="bg-red-600 text-white p-4 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-600 text-white p-4 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleScheduleLab} className="bg-gray-800 rounded-lg p-6 space-y-6">
          <FormField label="Lab Name">
            <input
              type="text"
              name="labName"
              value={formData.labName}
              onChange={handleInputChange}
              className="w-full bg-gray-700 rounded px-3 py-2"
              placeholder="Enter lab name"
            />
          </FormField>

          <FormField label="Description">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full bg-gray-700 rounded px-3 py-2 h-32"
              placeholder="Enter lab description"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Start Time">
              <input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className="w-full bg-gray-700 rounded px-3 py-2"
              />
            </FormField>

            <FormField label="End Time">
              <input
                type="datetime-local"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className="w-full bg-gray-700 rounded px-3 py-2"
              />
            </FormField>
          </div>

          <FormField label="Batch/Section">
            <select
              name="batch"
              value={formData.batch}
              onChange={handleInputChange}
              className="w-full bg-gray-700 rounded px-3 py-2"
            >
              <option value="">Select Batch</option>
              {BATCH_OPTIONS.map(batch => (
                <option key={batch} value={batch}>{batch}</option>
              ))}
            </select>
          </FormField>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Schedule Lab
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleLabs;
