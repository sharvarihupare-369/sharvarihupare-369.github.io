import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from '../Pages/About'
import Contact from '../Pages/Contact'
import Home from '../Pages/Home'
import Projects from '../Pages/Projects'
import Skills from '../Pages/Skills'


function AllRoutes() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>}/>
            
            <Route path="/about" element={<About/>}/>
           
            <Route path="/skills" element={<Skills/>}/>
          
            <Route path="/projects" element={<Projects/>}/>
          
            <Route path="/contact" element={<Contact/>}/>
        </Routes>
    </div>
  )
}

export default AllRoutes