import React,{useState} from 'react'
import Userdata from '../hooks/data'
import Navbar from './Navbar';
import deleteBlogs from '../hooks/deleteBlogs';
import { useNavigate } from 'react-router-dom';
import Bloggit_Background from '../assets/images/Bloggit_Background.jpeg';

function Profile() {
  const navigate = useNavigate()
  const data = Userdata(); 

  const { blogs, users, likes, user } = data;

  const [showConfirm,setShowConfirm] = useState(false);
 
   if(!user){
    return <p>Loading....</p>
  }
  const userBlogs = blogs.filter(blog => blog.userid == user.id);
  
  async function handleDelete(id) {
    const data = await deleteBlogs(id);
    if(data.success){
      window.location.reload();
    }
    else{
      console.error("failed to delete blog")
    }
  }

  async function deleteProfile() {
    const res = await fetch("/api/users/deleteprofile",{
      method:"DELETE",
      credentials: 'include',
    })
    const data = await res.json();
    if(data.success){
      navigate("/");
    } else {
      console.log("Delete profile login");
      
    }
    
  }
  return (
    <>
    <Navbar />
<div
  className="min-h-screen bg-cover bg-center flex flex-col items-center px-4 py-12 space-y-10"
  style={{ backgroundImage: `url(${Bloggit_Background})` }}
>
  {/* --- User Info Card --- */}
  <div className="w-full max-w-5xl bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
    <h1 className="text-5xl font-extrabold mb-6 text-blue-800">
      Welcome back, {user.firstname}
    </h1>

    <div className="mb-6 text-gray-800 space-y-2 text-lg">
      <p><span className="font-semibold">Full Name:</span> {user.firstname} {user.lastname}</p>
      <p><span className="font-semibold">Username:</span> {user.username}</p>
      <p><span className="font-semibold">Email:</span> {user.email}</p>
      <p><span className="font-semibold">Age:</span> {user.age}</p>
      {user.membership ? (
        <p className="text-green-700 font-semibold">Membership Active</p>
      ) : (
        <a href="/member">
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Apply for Membership
          </button>
        </a>
      )}
      {user.admin && <p className="text-purple-700 font-semibold">Admin</p>}
    </div>

    <button
      className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
      onClick={() => setShowConfirm(true)}
    >
      Delete Profile
    </button>
  </div>

  {/* --- Blog List Card --- */}
  <div className="w-full max-w-5xl bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Blogs</h2>

    {userBlogs.length === 0 && (
      <p className="text-gray-600 italic">You haven’t written any blogs yet.</p>
    )}

    <div className="space-y-6">
      {userBlogs.map(blog => (
        <div key={blog.id} className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-md">
          <h4 className="text-2xl font-bold text-gray-900">{blog.title}</h4>
          <p className="mt-2 text-gray-700">{blog.text}</p>
          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <p>Author: {users.find(u => u.id === blog.userid)?.username || "Unknown"}</p>
            <p>Created: {new Date(blog.created).toLocaleDateString()}</p>
            <button
              onClick={() => handleDelete(blog.id)}
              className="text-red-600 hover:underline mt-2 inline-block"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* --- Delete Confirmation Modal --- */}
  {showConfirm && (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md text-center space-y-4">
        <h2 className="text-xl font-bold text-red-600">Confirm Deletion</h2>
        <p>Are you sure you want to delete your profile? This action cannot be undone.</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={deleteProfile}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}
</div>

    </>
  )
}

export default Profile