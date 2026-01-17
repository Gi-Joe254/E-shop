import { useEffect, useState } from 'react'

import './App.css'
import { healthCheck } from './services/healthCheck'

function App() {
  useEffect( ()=>{
    healthCheck().then(console.log)
  },[])
  return (
    <>
      <div>
       E-repairs Shop.
       Welcome
      </div>
    </>
  )
}

export default App
