import React from 'react';

const Resources = () => {
  const labResources = [
    {
      title: "Computer Networks",
      description: "Resources for networking protocols, socket programming, and network security",
      items: [
        { name: "TCP/IP Implementation Guide", type: "PDF", size: "2.5 MB" },
        { name: "Network Security Labs", type: "ZIP", size: "15 MB" },
        { name: "Socket Programming Examples", type: "Code", size: "1 MB" }
      ]
    },
    {
      title: "Database Systems",
      description: "Materials for database design, SQL, and database management",
      items: [
        { name: "SQL Query Examples", type: "PDF", size: "1.8 MB" },
        { name: "Database Design Templates", type: "ZIP", size: "5 MB" },
        { name: "Normalization Exercises", type: "PDF", size: "900 KB" }
      ]
    },
    {
      title: "Operating Systems",
      description: "Resources for process management, memory allocation, and file systems",
      items: [
        { name: "Process Scheduling Simulator", type: "EXE", size: "4.2 MB" },
        { name: "Memory Management Labs", type: "ZIP", size: "8 MB" },
        { name: "File System Implementation", type: "PDF", size: "2.1 MB" }
      ]
    }
  ];

  const tutorials = [
    {
      title: "Getting Started",
      duration: "10 mins",
      link: "#",
      description: "Learn how to set up your virtual lab environment and access resources"
    },
    {
      title: "Using the Code Editor",
      duration: "15 mins",
      link: "#",
      description: "Master the built-in code editor features and shortcuts"
    },
    {
      title: "Submitting Assignments",
      duration: "8 mins",
      link: "#",
      description: "Step-by-step guide to submitting your lab assignments"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Learning Resources</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Access comprehensive learning materials, tutorials, and lab resources to enhance your 
            virtual lab experience.
          </p>
        </div>

        {/* Quick Start Tutorials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Quick Start Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tutorials.map((tutorial, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{tutorial.title}</h3>
                  <span className="text-sm text-gray-400">{tutorial.duration}</span>
                </div>
                <p className="text-gray-300 mb-4">{tutorial.description}</p>
                <a
                  href={tutorial.link}
                  className="text-blue-400 hover:text-blue-300 flex items-center"
                >
                  Watch Tutorial
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Lab Resources */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Lab Resources</h2>
          <div className="space-y-8">
            {labResources.map((resource, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <p className="text-gray-300 mb-4">{resource.description}</p>
                <div className="space-y-3">
                  {resource.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-600 p-2 rounded">
                          {item.type === 'PDF' && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          )}
                          {item.type === 'ZIP' && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2v2H6v2H4V6zm10 0h2a2 2 0 012 2v2h-2V8h-2V6zM4 16v2a2 2 0 002 2h2v-2H6v-2H4zm10 0h2v2h2v2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                          )}
                          {item.type === 'Code' && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-400">{item.size}</span>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;