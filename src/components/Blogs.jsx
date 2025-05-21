import React, { useEffect, useState } from 'react';

function Blogs({blogs,users,user}) {
  return (
    <>
    {user ? <h3>Welcome {user.firstname}</h3> :  <h3>Welcome to Bloggit!!</h3> }

    {blogs.map(blog =>(
        <div>
            <h4>{blog.title}</h4>
            <p>{blog.text}</p>
            <br />
            {user && (
                <>
                <p>Author: {users.find(u=> u.id === blog.userid).username}</p>
                <p>Created: {new Date(blog.created).toLocaleDateString()}</p>
                {user.admin && <a href='/blogs/delete/<%= blog.id%>'>Delete</a>}
                </>
            )}
        </div>
    ))}
    </>
  )
}

export default Blogs