import React,{ useState } from "react"
import { useNavigate } from "react-router-dom";

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
   <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
    <h1 className="text-2xl font-semibold mb-6 text-center" >New Blog</h1>
    <form onSubmit={handleSubmit} className="space-y-4">

    <label htmlFor="blogtitle" className="block font-medium text-gray-700">Please Enter the title for your Blog!!</label>
    <input id="blogtitle" name="blogtitle" placeholder="Enter Title...." type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    
    {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
    
    <label htmlFor="blogtext" className="block font-medium text-gray-700">Enter your blog</label>
    <textarea name="blogtext" id="blogtext" rows={6} placeholder="Type your Blog here....." type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
    
    
    {errors.text && <p className="text-red-600 text-sm mt-1">{errors.text}</p>}
    
    <button type='submit' className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">Submit</button>
    
    {errors.form && <p className="text-red-600 text-sm mt-1">{errors.form}</p>}
    </form>
        </div>
  )
}

export default NewBlog