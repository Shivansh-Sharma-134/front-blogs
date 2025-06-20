import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
const API_URL = import.meta.env.API_URL || "";
import Bloggit_Background from '../assets/images/Bloggit_Background.jpeg';

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
        
        const res = await fetch(`${API_URL}/api/users/login`,{
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
         <>
      <Navbar />
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${Bloggit_Background})` }}
      >
        <div className="bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-lg">
          <h1 className="text-5xl font-extrabold text-center text-blue-700">Welcome Back</h1>
          <p className="text-center text-gray-700 mt-2 mb-6 text-lg">
            Log in to continue exploring Bloggit.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block font-medium text-gray-800">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
              {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block font-medium text-gray-800">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold text-lg"
            >
              Log In
            </button>

            {errors.form && <p className="text-red-600 text-sm mt-2 text-center">{errors.form}</p>}
          </form>

          <p className="text-sm mt-6 text-center">
            Don't have an account?{" "}
            <a href="/sign-up" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
    )

}

export default Login