
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/navbar/navbar'
import './index.css'
import Home from './pages/home/home'
import { Food } from './pages/foods/food'

import { Notes } from './pages/notes/notes'
import Baner from './components/baners/baner'
import { Natacion } from './pages/rutinas/natacion/natacion'
import { Gym } from './pages/rutinas/gym/gym'

function App() {


  return (
    <>
  
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          
          <Route path="/routine" element={<Baner/>}/>
          <Route path="/food" element={<Food />} />
          <Route path="/natacion" element={<Natacion/>}/>
          <Route path="/gym" element={<Gym />} />
          {/* <Route path="path" element={} /> */}
          <Route path="/note" element={<Notes/>} />
        </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
