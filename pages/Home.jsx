import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/assets/NCE.avif)' }}>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/85 to-gray-900/80"></div>
        
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex justify-center items-center h-full text-white text-center px-6"
        >
          <div className="max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-transparent bg-clip-text"
            >
              Welcome to Virtual College Lab
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl mb-12 text-gray-200"
            >
              Access courses, teaching tools, and more in one place. Log in to get started.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6"
            >
              <Link
                to="/student-login"
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Student Login
              </Link>
              <Link
                to="/faculty-login"
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white text-lg font-semibold hover:from-purple-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Faculty Login
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* About Section */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
          >
            Nalanda College of Engineering
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg text-gray-300 leading-relaxed text-justify"
          >
            Nalanda College of Engineering is a Government Engineering College working under the Department of Science and Technology. It has been established by the Government of Bihar in 2008. It is situated on the holy land where Lord Buddha experienced enlightenment and Lord Vardhaman Mahavir embraced Nirvana. It belongs to the land of ancient Nalanda University where students across the world would study Buddhism.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg text-gray-300 leading-relaxed mt-6 text-justify"
          >
            Initially in the year 2008 it offered B. Tech. Degree in four programs namely Computer Science & Engineering, Civil Engineering, Mechanical engineering and Electrical & Electronics Engineering. In the subsequent year, three more programs i.e. B. Tech. in Aeronautical Engineering, B. Tech. in Artificial Intelligence & Machine Learning and M.Tech in power System came into existence. Each branch for B.Tech consists of 60 students and the total number of students is around 1200.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Home;
