import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Signup() {
    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [age,setAge] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const [errors,setErrors] = useState({});

    async function handleSubmit(e){
        e.preventDefault();

        const newErrors={};
        if(!firstname.trim())  newErrors.firstname = "This field is required";
        if(!lastname.trim())  newErrors.lastname = "This field is required";
        if(!username.trim())  newErrors.username = "This field is required";
        if(!email.trim())  newErrors.email = "This field is required";
        if(!age.trim())  newErrors.age = "This field is required";
        if(!password.trim())  newErrors.password = "This field is required";

        if(Object.keys(newErrors).length >0){
            setErrors(newErrors);
            return;
        }

        const formData = new URLSearchParams();
        formData.append("firstname",firstname);
        formData.append("lastname",lastname);
        formData.append("username",username);
        formData.append("email",email);
        formData.append("age",age);
        formData.append("password",password);
        
        const res = await fetch("/api/users/signup",{
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
            navigate("/log-in")
        }

    }
    


  return (
    <>
    <Navbar />
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-2xl shadow-2xl">
  <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">Sign Up</h1>
  <p className="text-center text-gray-600 mb-6">
    Please enter your details below.<br />
    <span className="text-sm">
      Already have an account?{" "}
      <a href="/log-in" className="text-blue-600 hover:underline">
        Log in
      </a>
    </span>
  </p>

  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">Firstname</label>
      <input
        id="firstname"
        name="firstname"
        type="text"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {errors.firstname && <p className="text-red-600 text-sm mt-1">{errors.firstname}</p>}
    </div>

    <div>
      <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Lastname</label>
      <input
        id="lastname"
        name="lastname"
        type="text"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {errors.lastname && <p className="text-red-600 text-sm mt-1">{errors.lastname}</p>}
    </div>

    <div>
      <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
    </div>

    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
    </div>

    <div>
      <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
      <input
        id="age"
        name="age"
        type="text"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {errors.age && <p className="text-red-600 text-sm mt-1">{errors.age}</p>}
    </div>

    <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
    >
      Create Account
    </button>

    {errors.form && <p className="text-red-600 text-sm mt-2 text-center">{errors.form}</p>}
  </form>
</div>

        </>
  )
}

export default Signup