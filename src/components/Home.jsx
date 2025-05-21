import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'
import Blogs from './Blogs'


function Home() {

  const [blogs,setBlogs] = useState([]);
      const [users,setUsers] = useState([]);
      const [user,setUser] = useState(null);
      useEffect(()=>{
          fetch("/api/homepage",{
              method: "GET",
              credentials:"include",
          }).then(res=>res.json()).then(data =>{
              setBlogs(data.blogs);
              setUsers(data.users);
              setUser(data.user);
          })
      }, [])

  return (
    <>
      <Navbar blogs={blogs} users={users} user={user} />
      <Blogs blogs={blogs} users={users} user={user} />
    </>
  )
}

export default Home