import React from "react";

const CompletedLabsSection = () => {
  const completedLabs = [
    {
      id: 1,
      title: "React Basics",
      date: "2024-11-28",
      status: "Enrolled",
      isTimedOut: false,
      practiceLink: "/practice/react-basics",
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      date: "2024-11-25",
      status: "Timed Out",
      isTimedOut: true,
    },
    {
      id: 3,
      title: "CSS Mastery",
      date: "2024-11-20",
      status: "Enrolled",
      isTimedOut: false,
      practiceLink: "/practice/css-mastery",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg h-full">
      <h2 className="text-3xl text-center font-extrabold text-gray-800 mb-6">Completed Labs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[300px]">
        {completedLabs.map((lab) => (
          <div
            key={lab.id}
            className={`p-4 border-l-4 rounded-lg shadow-md transition-transform transform hover:scale-105 ${
              lab.isTimedOut
                ? "border-red-500 bg-red-50"
                : "border-green-500 bg-green-50"
            }`}
          >
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-semibold mb-2">{lab.title}</h3>
              {lab.isTimedOut && (
                <span className="text-sm font-semibold text-red-600">Timed Out</span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-gray-600">Date: {new Date(lab.date).toDateString()}</p>
            </div>
            <div className="mt-4">
              {lab.practiceLink && (
                <a
                  href={lab.practiceLink}
                  className="bg-green-600 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-green-700 transition duration-300 w-full text-center"
                >
                  Practice Lab
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedLabsSection;
