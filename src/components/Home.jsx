import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'
import Blogs from './Blogs'
import Userdata from '../hooks/data';
import About from './About';


function Home({setAuthKey}) {
  
  const {blogs,users,likes,user,loading} = Userdata();
  if (loading) {
  return (
    <div className="flex justify-center items-center min-h-screen text-xl text-gray-600">
      Loading...
    </div>
  );
}
  
  return (
    <>
    {user?
      <><Navbar setAuthKey={setAuthKey}/>
      <Blogs blogs={blogs} users={users} user={user} likes={likes} /></>:<About />}
    </>
  )
}

export default Home