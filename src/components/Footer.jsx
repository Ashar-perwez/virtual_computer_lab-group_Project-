import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">&copy; {new Date().getFullYear()} Virtual Computer Lab. All rights reserved.</p>
            <p className="text-sm">Privacy Policy | Terms of Use</p>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-400 hover:text-blue-400 transition duration-300">Home</Link>
            <Link to="/about" className="text-gray-400 hover:text-blue-400 transition duration-300">About</Link>
            <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition duration-300">Contact</Link>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition duration-300"><FaFacebookF size={20} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition duration-300"><FaTwitter size={20} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition duration-300"><FaLinkedinIn size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;