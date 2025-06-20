import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'
import Blogs from './Blogs'
import Userdata from '../hooks/data';
import Signup from './Signup';


function Home({setAuthKey}) {
  
  const {blogs,users,likes,user} = Userdata();
  console.log('home',user);
  
  return (
    <>
    {user?
      <><Navbar setAuthKey={setAuthKey}/>
      <Blogs blogs={blogs} users={users} user={user} likes={likes} /></>:<Signup />}
    </>
  )
}

export default Home