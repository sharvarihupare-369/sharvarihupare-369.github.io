import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from '../Pages/About'
import Contact from '../Pages/Contact'
import Home from '../Pages/Home'
import Projects from '../Pages/Projects'
import Skills from '../Pages/Skills'
import Tools from '../Pages/Tools'
import Footer from '../Pages/Footer'


function AllRoutes() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>}/>
            
            <Route path="/about" element={<About/>}/>
           
            <Route path="/skills" element={<Skills/>}/>
          
            <Route path="/projects" element={<Projects/>}/>

            <Route path='/tools' element={<Tools/>} />
          
            <Route path="/contact" element={<Contact/>}/>

            <Route path="/footer" element={<Footer/>}/>
        </Routes>
    </div>
  )
}

export default AllRoutes