import { useState } from "react";
import { NavLink } from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LogoutIcon from '@mui/icons-material/Logout';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PoolIcon from '@mui/icons-material/Pool';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import './navbar.css'


// const serverFront = "http://localhost:3001";

export function Navbar(){

    const [isOpen,setOpen] = useState(false);
    const [subMenu,setSubMenu]  = useState(false);

    const toggleMenu = () => {
        setOpen(!isOpen);
        document.body.classList.toggle('open',!isOpen);
    }

    const closeMenu = () => {
        setOpen(false);
        document.body.classList.remove('open');
    }

    const toggleSubMenu = () => {
        setSubMenu(!subMenu);
    }

    const closeSubMenu = () => {
        setSubMenu(false);
    }

    return(
        <nav>
            <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={closeMenu}></div>
            <div className="container">

                <div className="navbar">

                    <div className={`menu ${isOpen ? 'open' : ''}`}>
                        
                        <NavLink to="/" onClick={closeMenu}>
                           <HomeIcon/> <a className="active"> Inicio </a>  
                        </NavLink>

                        <div className="nav-item" onClick={toggleSubMenu}>
                            <FormatListBulletedIcon/> <a className="active"> Rutinas </a>
                        </div>

                       

                        <div className={`sub-menu ${subMenu ? 'open' : ''}`} onClick={closeMenu}>
                            <NavLink to='/natacion' onClick={closeSubMenu}>
                                <PoolIcon/> <a className="submenu-item"> Natación </a>
                            </NavLink>

                            <NavLink to='/gym' onClick={closeSubMenu}>
                                <FitnessCenterIcon/> <a className="submenu-item"> Gym </a>
                            </NavLink>

                            <NavLink to='/bike' onClick={closeSubMenu}>
                                <DirectionsBikeIcon/> <a className="submenu-item"> Bicicleta </a>
                            </NavLink>
                        </div>

                        <NavLink to="/note" onClick={closeMenu}>
                            <DescriptionIcon/> <a className="active">Notas</a>
                        </NavLink>

                        <NavLink to="/food" onClick={closeMenu}>
                            <LocalDiningIcon/> <a className="active">Dieta</a>
                        </NavLink>

                        <NavLink to="/seguimiento" onClick={closeMenu}>
                            <MonitorHeartIcon/> <a className="active">Seguimiento</a>
                        </NavLink>
 
                        <div className="logout" >
                            <NavLink to="/logout" onClick={closeMenu}>
                               <LogoutIcon/> <a className="active">Cerrar Sesión</a>
                            </NavLink>
                        </div>
                 
                    </div>

                            <div onClick={toggleMenu} className={`menu-icon ${isOpen ? 'open' : ''}`}>            
                            <span></span>
                            <span></span>
                            <span></span>  
                        </div>
                </div>
   
            </div>
        </nav>
    )
}