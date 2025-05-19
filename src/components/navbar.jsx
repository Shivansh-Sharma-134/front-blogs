import React from 'react'

function navbar() {
  return (
     <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold">MyApp</div>
      <ul className="flex gap-6">
        <li><a href="/" className="hover:text-gray-300">Home</a></li>
        <li><a href="/about" className="hover:text-gray-300">About</a></li>
        <li><a href="/blogs" className="hover:text-gray-300">Blogs</a></li>
        <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
      </ul>
    </nav>
  )
}

export default navbar