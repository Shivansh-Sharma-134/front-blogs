import React,{useState} from 'react'
import Userdata from '../hooks/data'
import Navbar from './Navbar';
import deleteBlogs from '../hooks/deleteBlogs';
import { useNavigate } from 'react-router-dom';
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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 className="text-3xl font-bold mb-4">Hello {user.firstname}</h1>
    {user.membership ? <h4 className="text-green-600 font-semibold mb-2">Membership Active </h4> : <a href="/member"><button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Apply for membership</button></a>}
    {user.admin &&  <h4  className="text-purple-600 font-semibold mb-4"> Admin </h4>}
    <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all" onClick={() => setShowConfirm(true)}>Delete Profile</button>
       
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
            <button className="text-red-600 hover:underline mt-2 inline-block" onClick={()=> handleDelete(blog.id)}>Delete</button>
            
    
        </div>
        

))}
    </div>
    </>
  )
}

export default Profile