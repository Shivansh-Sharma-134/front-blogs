import React,{useEffect,useState} from "react"
import { Route, Router, Routes } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import NewBlog from "./components/NewBlog";
import About from "./components/About";

function App() {
  const [authKey,setAuthKey]= useState(0);
  return (
    <>
    <Routes>
      <Route path="/" element={<Home key={authKey} setAuthKey={setAuthKey}/>}/>
      <Route path="/log-in" element={<Login />}/>
      <Route path="/sign-up" element={<Signup />}/>
      <Route path="/profile" element={<Profile />} />
      <Route path="/newBlog" element={<NewBlog />}/>
      <Route path="/about" element={<About />}/>
    </Routes>
    </>
  )
}

export default App
