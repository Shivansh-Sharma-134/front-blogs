import React,{useEffect,useState} from "react"
import { Route, Router, Routes } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"

function App() {
  const [authKey,setAuthKey]= useState(0);
  return (
    <>
    <Routes>
      <Route path="/" element={<Home key={authKey} setAuthKey={setAuthKey}/>}/>
      <Route path="/log-in" element={<Login />}/>
    </Routes>
    </>
  )
}

export default App
