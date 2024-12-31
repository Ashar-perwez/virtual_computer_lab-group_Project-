import React from "react";

const UpcomingLabsSection = () => {
  const upcomingLabs = [
    {
      id: 1,
      title: "React Advanced",
      date: "2024-12-10",
      startTime: "2024-12-10T14:00:00",
      endTime: "2024-12-10T16:00:00",
      mentor: "Alice Brown",
    },
    {
      id: 2,
      title: "Node.js Fundamentals",
      date: "2024-12-15",
      startTime: "2024-12-15T10:00:00",
      endTime: "2024-12-15T12:00:00",
      mentor: "Bob Smith",
    },
    {
      id: 3,
      title: "Python for Data Science",
      date: "2024-12-20",
      startTime: "2024-12-20T09:00:00",
      endTime: "2024-12-20T11:00:00",
      mentor: "Clara Johnson",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg h-full">
      <h2 className="text-3xl text-center font-extrabold text-gray-800 mb-6">Upcoming Labs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[300px]">
        {upcomingLabs.map((lab) => (
          <div
            key={lab.id}
            className="p-4 border-l-4 border-indigo-500 bg-indigo-50 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-semibold mb-2">{lab.title}</h3>
            </div>
            <div className="flex-1">
              <p className="text-gray-600">Mentor: {lab.mentor}</p>
              <p className="text-gray-600">Date: {lab.date}</p>
              <p className="text-gray-600">Time: {lab.startTime} - {lab.endTime}</p>
            </div>
            <div className="mt-4">
              <a
                href={`/editor/${lab.title.replace(/\s+/g, '-').toLowerCase()}`}
                className="bg-indigo-600 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-indigo-700 transition duration-300 w-full text-center"
              >
                Open Lab
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingLabsSection;
