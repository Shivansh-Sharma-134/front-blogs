import React from 'react'
import Userdata from '../hooks/data'
function Profile() {
  const {blogs,users,user} = Userdata();
  if(!user){
    return <p>Loading....</p>
  }
  const userBlogs = blogs.filter(blog => blog.userid == user.id)
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 className="text-3xl font-bold mb-4">Hello {user.firstname}</h1>
    {user.membership ? <h4 className="text-green-600 font-semibold mb-2">Membership Active </h4> : <a href="/users/membershipapply"><button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Apply for membership</button></a>}
    {user.admin ?  <h4  className="text-purple-600 font-semibold mb-4"> Admin </h4> :<a href="/users/adminapply"><button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Apply to become an admin</button></a>}
        <div className="space-y-1 text-gray-700 mb-6">
        <p>Name: {user.firstname} {user.lastname}</p>
        <p>username: {user.username}</p>
        <p>email: {user.email}</p>
        <p>age: {user.age}</p>
        </div>

        <h1 className="text-2xl font-bold mt-6 mb-4">Your Blogs</h1>
        {userBlogs.map(blog =>(
        
        <div key={blog.id} className="mb-6 p-4 border rounded shadow-sm bg-gray-50">
            <h4 className="text-xl font-semibold mb-2">{blog.title}</h4>
            <p className="text-gray-800 mb-2">{blog.text}</p>
            <br />
            <p className="text-sm text-gray-600">Author: {users.find(u=> u.id === blog.userid).username}</p>
            <p className="text-sm text-gray-600 mb-2">Created: {new Date(blog.created).toLocaleDateString()}</p>
            <a href='/blogs/delete/<%= blog.id%>' className="text-red-500 hover:underline">Delete</a>
    
        </div>
        

))}
    </div>
  )
}

export default Profile