import React, { useEffect, useState } from 'react';

function Blogs() {
    const [blogs,setBlogs] = useState([]);
    const [users,setUsers] = useState([]);

    useEffect(()=>{
        fetch("/api/homepage").then(res=>res.json()).then(data =>{
            setBlogs(data.blogs);
            setUsers(data.users);
        })
    }, [])
  return (
    <>
    {blogs.map(blog =>(
        <div>
            <h4>{blog.title}</h4>
            <p>{blog.text}</p>
            <br />
        </div>
    ))}
    </>
  )
}

export default Blogs