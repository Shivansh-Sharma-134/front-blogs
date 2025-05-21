import React from 'react'

function Navbar({blogs,users,user}) {

  return (
     <nav className="bg-gray-800 text-white pl-5 h-20 flex justify-between items-center ">
      <a href='/'>
      <div className="text-2xl font-bold ">Bloggit</div>
      </a>
      <ul className="flex h-full ">
        {user ? (
          <>
        <li><a href="/profile" className="block px-4 py-6 h-full hover:text-black hover:bg-white text-center">Profile</a></li>
        <li><a href="/newBlog" className="block  px-4 py-6 h-full hover:text-black hover:bg-white">New Blog</a></li>
        <li><a href="/log-out" className="block px-4 py-6 h-full hover:text-white hover:bg-orange">Logout</a></li>
          </>
        ):(
          <>
        <li><a href="/about" className="block   px-4 py-6 h-full hover:text-black hover:bg-white">About</a></li>
        <li><a href="/log-in" className="block  px-4 py-6 h-full hover:text-black hover:bg-white">Log In</a></li>
        <li><a href="/sign-up" className="block px-4 py-6 h-full hover:text-black hover:bg-white">Sign Up</a></li>
          </>
        )}
      </ul>
    </nav>

  )
}

export default Navbar