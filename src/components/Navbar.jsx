import React from 'react'
import { useNavigate } from 'react-router-dom'
import Userdata from '../hooks/data';


function Navbar({setAuthKey}) {
  const {user} = Userdata();
  const navigate = useNavigate();
  async function handleLogout() {
    const res = await fetch("/api/users/logout",{
      method: "GET",
      credentials: 'include',
    })
    if(res.ok){
      setAuthKey(prev=> prev+1);
      navigate("/sign-up")
    }
    else{
      console.log("logout error");
    }

  }
  
  
  return (
     <nav className="bg-gray-800 text-white pl-5 h-20 flex justify-between items-center ">
      <a href='/'>
   <div className="text-2xl font-bold">
  <span className="text-red-600">B</span>
  <span className="">loggit</span>
</div>
      </a>
      <ul className="flex h-full ">
        {user ? (
          <>
        <li><a href="/profile" className="block px-4 py-6 h-full hover:text-black hover:bg-white text-center">Profile</a></li>
        <li><a href="/newBlog" className="block  px-4 py-6 h-full hover:text-black hover:bg-white">New Blog</a></li>
        <li><a href="/about" className="block   px-4 py-6 h-full hover:text-black hover:bg-white">About</a></li>
        <li><button onClick={handleLogout} className="block px-4 py-6 h-full hover:text-black hover:bg-white">Logout</button></li>
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