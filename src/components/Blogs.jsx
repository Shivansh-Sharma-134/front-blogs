import React, { useEffect, useState } from 'react';
import deleteBlogs from '../hooks/deleteBlogs';
import { Heart } from 'lucide-react';
function Blogs({blogs,users,user,likes}) {
  const[likedBlogs,setLikedBlogs] = useState()
  if(user){
  const userLikedBlogIds = likes.filter(like => like.userid === user.id).map(like => like.blogid);
  setLikedBlogs(userLikedBlogIds);
  console.log(userLikedBlogIds);
  }
  async function handleDelete(id) {
    const data = await deleteBlogs(id);
    if(data.success){
      window.location.reload();
    }
    else{
      console.error("failed to delete blog")
    }
  }
  
  async function addLike(userid,blogid) {
    const formdata = new URLSearchParams();
    formdata.append("userid",userid);
    formdata.append("blogid",blogid);
    const res = await fetch("/api/blogs/like",{
      method: "POST",
      body: formdata,
      credentials:"include",
    });

    const data=await res.json();

    if(data.success){
      setLikedBlogs((prev) => ({
        ...prev,
        [id]: !prev[id]
      }))
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
                
                <button onClick={()=> addLike(user.id,blog.id)}  className="flex items-center space-x-2 text-pink-600 hover:text-pink-800">
              {likedBlogs[blog.id] ? <HeartHandshake size={18} /> : <Heart size={18} />}
              Like {blog.likes}</button>
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