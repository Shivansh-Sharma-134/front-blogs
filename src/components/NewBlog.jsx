import React,{ useState } from "react"
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Bloggit_Background from '../assets/images/Bloggit_Background.jpeg';

function NewBlog() {
  const[title,setTitle]=useState('');
  const[text,setText]=useState('');
  const [errors,setErrors] = useState({});
  const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        const newErrors ={};

        if(!title.trim())  newErrors.title = "this field is required";
        if(!text.trim()) newErrors.text = "this field is required";

        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            return
        }

        const formData = new URLSearchParams();
        formData.append("title",title);
        formData.append("blogText",text);

        const res = await fetch("/api/blogs/addnewblog",{
            method:"POST",
            body: formData,
            credentials: "include"
        });
        const data = await res.json();

        if(!res.ok){
            setErrors(data.errors || {form:"server error"});
            return;
        }
        if(data.success){
            navigate('/');
        }
    }
    return (
        <>
      <Navbar />
      <div
        className="min-h-screen bg-cover bg-center flex  justify-center px-4"
        style={{ backgroundImage: `url(${Bloggit_Background})` }}
      >
        <div className="w-full max-w-3xl mt-6 mb-120 bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl p-10">
          <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">
            New Blog!!!
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="blogtitle" className="block font-medium text-gray-700">
                Blog Title
              </label>
              <input
                id="blogtitle"
                name="blogtitle"
                placeholder="Enter your blog title..."
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="blogtext" className="block font-medium text-gray-700">
                Blog Content
              </label>
              <textarea
                name="blogtext"
                id="blogtext"
                rows={6}
                placeholder="Write your blog here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              {errors.text && <p className="text-red-600 text-sm mt-1">{errors.text}</p>}
            </div>
            <div className="flex justify-center">
            <button
              type='submit'
              className="w-40 bg-blue-600  text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Submit Blog
            </button>
            </div>
            {errors.form && <p className="text-red-600 text-sm mt-1 text-center">{errors.form}</p>}
          </form>
        </div>
      </div>
    </>
  )
}

export default NewBlog