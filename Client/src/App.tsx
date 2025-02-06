
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/navbar/navbar'
import './index.css'
import Home from './pages/home/home'
import { Natacion } from './pages/rutinas/natacion/natacion'

function App() {


  return (
    <>
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/natacion" element={<Natacion/>} />
        </Routes>
    </BrowserRouter>
      
    
    </>
  )
}

export default App
