import React, { useEffect, useState } from 'react';
import deleteBlogs from '../hooks/deleteBlogs';
import { Heart } from 'lucide-react';
import Bloggit_Background from '../assets/images/Bloggit_Background.jpeg';

function Blogs({blogs,users,user,likes}) {
  const[likedBlogs,setLikedBlogs] = useState({})
  const [likeCount, setLikeCount] = useState({});
  
  useEffect(() => {
  if (user) {
    if (Object.keys(likedBlogs).length === 0) {
      const userLikedBlogIds = likes
        .filter((like) => like.userid === user.id)
        .map((like) => like.blogid);

      const userLikedObj = userLikedBlogIds.reduce((acc, curr) => {
        acc[curr] = true;
        return acc;
      }, {});

      const likeC = likes.reduce((acc, like) => {
        const blogId = like.blogid;
        acc[blogId] = (acc[blogId] || 0) + 1;
        return acc;
       }, {}); 
       setLikeCount(likeC)
      setLikedBlogs(userLikedObj);

      console.log("userLikedBlogIds", userLikedBlogIds);
    }
  } else {
    setLikeCount({});
    setLikedBlogs({});
  }
}, [user, likes]);

console.log(likedBlogs)
  async function handleDelete(id) {
    const data = await deleteBlogs(id);
    if(data.success){
      window.location.reload();
    }
    else{
      console.error("failed to delete blog")
    }
  }
  
  async function addRemoveLike(userid,blogid) {
    
    const formdata = new URLSearchParams();
    formdata.append("userid",userid);
    formdata.append("blogid",blogid);
    let res;
    if(likedBlogs[blogid]){
    res = await fetch("/api/blogs/dislike",{
      method: "POST",
      body: formdata,
      credentials:"include",
    });

    setLikeCount((prev) => ({
      ...prev,
       [blogid]: (prev[blogid] || 0) - 1
    }));
    }else{

    res = await fetch("/api/blogs/like",{
      method: "POST",
      body: formdata,
      credentials:"include",
    });

    setLikeCount((prev) => ({
      ...prev,
       [blogid]: (prev[blogid] || 0) + 1
    }));
  }
  
  const data=await res.json();

    if(data.success){
      setLikedBlogs((prev) => ({
        ...prev,
        [blogid]: !prev[blogid]
      }))
     }else {
      console.error("Failed to toggle like");
     }
  }

  return (
   <div
  className="min-h-screen bg-cover bg-center"
  style={{ backgroundImage: `url(${Bloggit_Background})` }}
>
  <div className="px-4 py-16 max-w-4xl mx-auto">
    <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 shadow-xl">
      {user ? (
        <h3 className="text-3xl font-bold mb-10 text-gray-800">Welcome {user.firstname}</h3>
      ) : (
        <h3 className="text-3xl font-bold mb-10 text-gray-800">Welcome to Bloggit!!</h3>
      )}

      <div className="space-y-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <h4 className="text-2xl font-bold text-gray-900">{blog.title}</h4>
            <p className="mt-3 text-gray-700">{blog.text}</p>
            <div className="mt-5 text-sm text-gray-600">
              {user && (
                <>
                  <button
                    onClick={() => addRemoveLike(user.id, blog.id)}
                    className="flex items-center space-x-2 text-pink-600 hover:text-pink-800"
                  >
                    {likedBlogs[blog.id] ? <Heart fill="pink" size={18} /> : <Heart size={18} />}
                    <span>Like {likeCount[blog.id] || "0"}</span>
                  </button>

                  <p className="mt-2 font-medium">Author: {users.find((u) => u.id === blog.userid).username}</p>
                  <p className="font-medium">Created: {new Date(blog.created).toLocaleDateString()}</p>

                  {user.admin && (
                    <button
                      className="text-red-600 hover:underline mt-2 inline-block"
                      onClick={() => handleDelete(blog.id)}
                    >
                      Delete
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

  )
}

export default Blogs