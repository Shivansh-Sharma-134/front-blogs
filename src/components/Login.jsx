import React, { useEffect, useState } from 'react';

function Login(){
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const [errors,setErrors] = useState({})



    return (
        <>
    <h1>Log In</h1>
    <form onSubmit={}>
    <label for="username">Username</label>
    <input id="username" name="username" placeholder="username" type="text" value={username} />
    {errors.username && }
    <label for="password">Username</label>
    <input id="password" name="password" placeholder="password" type="text" value={password} />
    <button type='submit'>Submit</button>
    </form>
        </>
    )

}