import React from 'react'

function Navbar() {
  return (
     <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <a href='/'>
      <div className="text-2xl font-bold ">Bloggit</div>
      </a>
      <ul className="flex gap-6">
        
        <li><a href="/" className="hover:text-gray-300">Home</a></li>
        <li><a href="/about" className="hover:text-gray-300">About</a></li>
        <li><a href="/log-in" className="hover:text-gray-300">Sign Up</a></li>
        <li><a href="/sign-up" className="hover:text-gray-300">Log In</a></li>
      </ul>
    </nav>
  )
}

export default Navbar