import React,{useEffect,useState} from "react"
import { Route, Router, Routes } from "react-router-dom"
import Home from "./components/Home"

function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/log-in" element={< />}/>
    </Routes>
    </>
  )
}

export default App
