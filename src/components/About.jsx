import React from 'react'
import { Mail, Linkedin, Github } from 'lucide-react';
import Navbar from './Navbar';
function About() {
  return (
    <>
    <Navbar />
   <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Welcome to Bloggit!!</h1>
      <p className="text-gray-700 mb-2">
        This project was created by <span className="font-semibold">Shivansh Sharma</span> as a way to show off his skills...
      </p>
      <p className="text-gray-700 mb-2">
        Just kidding! He built this to learn and practice building full-stack applications. It might not be the most complex, but it's a step forward and he’s proud of it! 😄
      </p>
      <p className="text-gray-700 mb-4">
        Do check out his other socials — pretty please?
      </p>

      <div className="flex space-x-6 mt-6 text-blue-600">
        <a
          href="http://www.linkedin.com/in/shivanshsharma134"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:text-blue-800"
        >
          <Linkedin size={20} />
          <span>LinkedIn</span>
        </a>

        <a
          href="https://github.com/Shivansh-Sharma-134"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:text-gray-800"
        >
          <Github size={20} />
          <span>GitHub</span>
        </a>

        <a
          href="mailto:shivanshsharma8047@gmail.com"
          className="flex items-center space-x-2 hover:text-red-600"
        >
          <Mail size={20} />
          <span>Email</span>
        </a>
      </div>
    </div>
  </>
  )
}

export default About