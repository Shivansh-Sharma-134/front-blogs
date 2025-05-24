import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Login(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const [errors,setErrors] = useState({})

    async function handleSubmit(e){
        e.preventDefault();

        const newErrors={};
        if(!username.trim())  newErrors.username = "This field is required";
        if(!password.trim())  newErrors.password = "This field is required";

        if(Object.keys(newErrors).length >0){
            setErrors(newErrors);
            return;
        }

        const formData = new URLSearchParams();
        formData.append("username",username);
        formData.append("password",password);
        
        const res = await fetch("/api/users/login",{
            method: "POST",
            body: formData,
            credentials: "include",
        });
        
        if(!res.ok){
            const data = await res.json();
            setErrors(data.errors || {form: "invalid login"})
            return;
        }
        const data = await res.json();
        if(data.success){
            navigate("/")
        }

    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
    <h1 className="text-2xl font-semibold mb-6 text-center" >Log In</h1>
    <form onSubmit={handleSubmit} className="space-y-4">

    <label htmlFor="username" className="block font-medium text-gray-700">Username</label>
    <input id="username" name="username" placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    
    {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
    
    <label htmlFor="password" className="block font-medium text-gray-700">Password</label>
    <input id="password" name="password" placeholder="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    
    {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
    
    <button type='submit' className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">Submit</button>
    
    {errors.form && <p className="text-red-600 text-sm mt-1">{errors.form}</p>}
    </form>
        </div>
    )

}

export default Login