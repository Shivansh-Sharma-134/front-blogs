import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
function Member() {
  
  const navigate = useNavigate();
     const [errors,setErrors] = useState('');
     const [key,setKey] = useState('')
  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if(!key.trim())  newErrors.key = "cant be empty"

    if(Object.keys(newErrors).length>0){
        setErrors(newErrors);
        return;
    }
    const formData = new URLSearchParams();
    formData.append("key",key);

    const res = await fetch("/api/users/membershipapply",{
        method: "POST",
        body: formData,
        credentials: "include",
    })

     if(!res.ok){
            const data = await res.json();
            setErrors(data.errors || {form: "invalid login"})
            return;
        }
        const data = await res.json();
        if(data.success){
            navigate("/profile")
        }


  }
  
    return (
    <>
     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
    <h1 className="text-2xl font-semibold mb-6 text-center" >Membership Application</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
    
    <label htmlFor="key" className="block font-medium text-gray-700">Please Enter the Key</label>
    <input id="key" name="key" placeholder="key" type="password" value={key} onChange={(e) => setKey(e.target.value)} className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    
    {errors.key && <p className="text-red-600 text-sm mt-1">{errors.key}</p>}
    
    <button type='submit' className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">Submit</button>
    
    {errors.form && <p className="text-red-600 text-sm mt-1">{errors.form}</p>}
    </form>
        </div>
    </>
  )
}

export default Member