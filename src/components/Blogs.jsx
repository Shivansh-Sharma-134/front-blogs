import React, { useEffect, useState } from 'react';
import deleteBlogs from '../hooks/deleteBlogs';

function Blogs({blogs,users,user}) {
  async function handleDelete(id) {
    const data = await deleteBlogs(id);
    if(data.success){
      window.location.reload();
    }
    else{
      console.error("failed to delete blog")
    }
  }
  
  return (
    <div className=" mx-auto mt-8 px-4">
    {user ? <h3 className="text-2xl font-semibold mb-6">Welcome {user.firstname}</h3> :  <h3 className="text-2xl font-semibold mb-6">Welcome to Bloggit!!</h3> }
    <div className="space-y-6">
    {blogs.map(blog =>(
        <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold text-gray-800">{blog.title}</h4>
            <p className="mt-2 text-gray-700">{blog.text}</p>
            <br />
            <div className="mt-4 text-sm text-gray-600">
            {user && (
                <>
                <p className="font-medium">Author: {users.find(u=> u.id === blog.userid).username}</p>
                <p className="font-medium">Created: {new Date(blog.created).toLocaleDateString()}</p>
                {user.admin && <button className="text-red-600 hover:underline mt-2 inline-block" onClick={()=> handleDelete(blog.id)}>Delete</button>}
                </>
            )}
            </div>
        </div>
    ))}
    </div>
    </div>
  )
}

export default Blogs