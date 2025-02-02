import React from 'react';

const About = () => {
  const features = [
    {
      title: "Virtual Lab Environment",
      description: "Access fully-equipped computer science laboratories from anywhere, anytime.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Real-time Collaboration",
      description: "Work together with professors and peers in real-time with integrated chat and code sharing.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      )
    },
    {
      title: "Automated Assessment",
      description: "Get instant feedback on your lab work with our automated assessment system.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const stats = [
    { number: "10+", label: "Active Students" },
    { number: "25+", label: "Lab Courses" },
    { number: "24/7", label: "Availability" },
    { number: "98%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Virtual Computer Lab</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Revolutionizing computer science education through accessible, interactive, and 
            comprehensive virtual laboratory experiences.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-300 text-lg">
              To provide accessible, high-quality computer science laboratory education to students 
              worldwide, breaking down geographical barriers and ensuring consistent learning experiences 
              through innovative virtual solutions.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-20">
          <div className="bg-gray-800 rounded-lg py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src="/team/ashar.jpg" 
                  alt="Ashar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ashar Perwez</h3>
              <p className="text-blue-400 mb-3">Development Supervisor</p>
              <p className="text-gray-400 text-sm mb-4"> Full Stack Developer responsible for overseeing the project's development, coordinating the team, and ensuring milestones are met.</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src="/team/ankit.jpg" 
                  alt="Ankit"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ankit Kumar</h3>
              <p className="text-blue-400 mb-3">Technical Developer</p>
              <p className="text-gray-400 text-sm mb-4">Specialized in server architecture and database management</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src="/team/shivani.jpg" 
                  alt="Shivani"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Shivani</h3>
              <p className="text-blue-400 mb-3">UI/UX Designer</p>
              <p className="text-gray-400 text-sm mb-4">Expert in UI/UX design and frontend development</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src="/team/chanda.jpg" 
                  alt="Chanda"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Chanda Kumari</h3>
              <p className="text-blue-400 mb-3">QA Engineer</p>
              <p className="text-gray-400 text-sm mb-4">Focused on quality assurance and testing automation</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;