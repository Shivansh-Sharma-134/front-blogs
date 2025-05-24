import React from 'react'


async function deleteBlogs(id) {

    const res = await fetch("/api/blogs/delete",{
        method: "POST",
          headers: {
      "Content-Type": "application/json"
    },
        body:JSON.stringify({blogId: id }),
        credentials:"include"
    })
  
  
 const data = await res.json()
  return data;
}

export default deleteBlogs