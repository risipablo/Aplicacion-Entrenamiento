
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/navbar/navbar'
import './index.css'
import Home from './pages/home/home'
import { Natacion } from './pages/rutinas/natacion/natacion'
import { Food } from './pages/foods/food'

import { Notes } from './pages/notes/notes'
import { Gym,  } from './pages/rutinas/gym/gym'

function App() {


  return (
    <>
  
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/natacion" element={<Natacion/>} />
          <Route path="/gym" element={<Gym/>} />

          <Route path="/food" element={<Food />} />
          <Route path="/note" element={<Notes/>} />
        </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
