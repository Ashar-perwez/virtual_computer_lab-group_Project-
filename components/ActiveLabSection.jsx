import React, { useState } from "react";

const ActiveLabsSection = () => {
  const [activeLabs, setActiveLabs] = useState([
    {
      id: 1,
      title: "React Basics",
      date: "2024-12-01",
      startTime: "2024-12-01T10:00:00",
      endTime: "2024-12-01T12:00:00",
      mentor: "John Doe",
      isEnrollable: false,
      isSubmitted: true,
      editorLink: "/editor/react-basics",
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      date: "2024-12-02",
      startTime: "2024-12-02T14:00:00",
      endTime: "2024-12-02T16:00:00",
      mentor: "Jane Smith",
      isEnrollable: false,
      isSubmitted: false,
      editorLink: "/editor/javascript-fundamentals",
    },
    {
      id: 3,
      title: "CSS Design Principles",
      date: "2024-12-05",
      startTime: "2024-12-05T10:00:00",
      endTime: "2024-12-05T12:00:00",
      mentor: "Alice Green",
      isEnrollable: true,
      isSubmitted: false,
      editorLink: "/editor/css-design",
    },
  ]);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg h-full">
      <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-6">
        Active Labs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[300px]">
        {activeLabs.map((lab) => (
          <div
            key={lab.id}
            className={`flex flex-col justify-between p-4 rounded-lg shadow-md border-l-4 transition-transform transform hover:scale-105 ${
              lab.isEnrollable
                ? "border-blue-500 bg-blue-50"
                : "border-gray-400 bg-gray-50"
            }`}
          >
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{lab.title}</h3>
              {lab.isEnrollable && (
                <span className="text-sm font-semibold text-blue-500">
                  Enrollable
                </span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-gray-600">Mentor: {lab.mentor}</p>
              <p className="text-gray-600">Date: {lab.date}</p>
              <p className="text-gray-600">Time: {lab.startTime} - {lab.endTime}</p>
            </div>
            <div className="mt-4">
              <a
                href={lab.editorLink}
                className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-blue-700 transition duration-300 w-full text-center"
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

export default ActiveLabsSection;
