import React from 'react'

function Navbar() {
  return (
     <nav className="bg-gray-800 text-white pl-5 h-20 flex justify-between items-center ">
      <a href='/'>
      <div className="text-2xl font-bold ">Bloggit</div>
      </a>
      <ul className="flex h-full ">
        
        <li><a href="/" className="block px-4 py-6 h-full hover:text-black hover:bg-white text-center">Home</a></li>
        <li><a href="/about" className="block   px-4 py-6 h-full hover:text-black hover:bg-white">About</a></li>
        <li><a href="/log-in" className="block  px-4 py-6 h-full hover:text-black hover:bg-white">Log In</a></li>
        <li><a href="/sign-up" className="block px-4 py-6 h-full hover:text-black hover:bg-white">Log In</a></li>
      </ul>
    </nav>

  )
}

export default Navbar