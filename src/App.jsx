import React from 'react'
import Homepage from './components/Homepage'
import { Routes, Route } from "react-router-dom";
import FrameCustomizer from './components/FrameCustomizer';
import CaursalFrame from './components/CaursalFrame';


const App = () => {
  return (
    <div>
      
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/" element={<FrameCustomizer />} >
          <Route path="caursal" element={<CaursalFrame />} />
          
         </Route>
         <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
     
    </div>
  )
}

export default App
