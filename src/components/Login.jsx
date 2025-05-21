import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function Login(){
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

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
            Navigate("/")
        }

    }

    return (
        <>
    <h1>Log In</h1>
    <form onSubmit={handleSubmit}>
    <label for="username">Username</label>
    <input id="username" name="username" placeholder="username" type="text" value={username} />
    {errors.username && <p>{errors.username}</p>}
    <label for="password">Username</label>
    <input id="password" name="password" placeholder="password" type="text" value={password} />
    {errors.password && <p>{errors.password}</p>}
    <button type='submit'>Submit</button>
    {errors.form && <p>{errors.form}</p>}
    </form>
        </>
    )

}

export default Login