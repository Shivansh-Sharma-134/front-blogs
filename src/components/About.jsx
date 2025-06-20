import React from 'react'
import { Mail, Linkedin, Github } from 'lucide-react';
import Navbar from './Navbar';
import Bloggit_Background from '../assets/images/Bloggit_Background.jpeg';
function About() {
  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-cover bg-center flex justify-center  px-4"
        style={{ backgroundImage: `url(${Bloggit_Background})` }}
      >
        <div className="max-w-6xl mt-10 mb-140 w-full bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl p-10">
          <h1 className="text-5xl font-extrabold mb-6 text-center">
            <span className='text-blue-800'>Welcome to </span><span className='text-red-600'>B</span><span className='text-blue-800'>loggit!</span>
          </h1>

          <p className="text-gray-800 text-lg mb-4 text-center">
            This project was crafted with care by <span className="font-semibold">Shivansh Sharma</span> —
            not just for show, but to learn, explore, and create something meaningful.
          </p>
          <p className="text-gray-700 text-center mb-4">
            It’s a playground of code, creativity, and commitment. A humble step toward mastery in
            full-stack development 🚀.
          </p>
          <p className="text-gray-700 text-center mb-6">
             Do check out his other socials — pretty please?
          </p>

          <div className="flex justify-center space-x-10 mt-4 text-red-600">
            <a
              href="http://www.linkedin.com/in/shivanshsharma134"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-blue-900 transition"
            >
              <Linkedin size={24} />
              <span className="font-medium">LinkedIn</span>
            </a>

            <a
              href="https://github.com/Shivansh-Sharma-134"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-gray-900 transition"
            >
              <Github size={24} />
              <span className="font-medium">GitHub</span>
            </a>

            <a
              href="mailto:shivanshsharma8047@gmail.com"
              className="flex items-center space-x-2 hover:text-blue-600 transition"
            >
              <Mail size={24} />
              <span className="font-medium">Email</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default About