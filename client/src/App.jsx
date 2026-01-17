import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import { healthCheck } from './services/healthCheck'
import Home from './pages/home'
import About from './pages/about'
import Services from './pages/services'
import Products from './pages/products'

function App() {
  useEffect( ()=>{
    healthCheck().then(console.log)
  },[])
  return (
    <BrowserRouter>
    {/*routes*/}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/services' element={<Services />}/>
        <Route path='/products' element={<Products />}/>
      </Routes>      
    </BrowserRouter>
  )
}

export default App
