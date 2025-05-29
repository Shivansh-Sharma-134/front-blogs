import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'
import Blogs from './Blogs'
import Userdata from '../hooks/data';


function Home({setAuthKey}) {

  const {blogs,users,likes,user} = Userdata();

  return (
    <>
      <Navbar setAuthKey={setAuthKey}/>
      <Blogs blogs={blogs} users={users} user={user} likes={likes} />
    </>
  )
}

export default Home