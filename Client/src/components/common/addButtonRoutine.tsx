import { Tooltip } from "@mui/material";
import { useState } from "react";


interface AddButtonRoutineProps {
    onOpen: () => void; // Prop para abrir el modal
}

export function AddButtonRoutine({onOpen}: AddButtonRoutineProps) {

    const [active, setActive] = useState<string | boolean>(false);


    const openMouse = (icon:any) => {
        setActive(icon)
    }

    const closeMouse = () => {
        setActive(false)
    }

    return (

        
        <button className="btn-outlined" onClick={onOpen} onMouseEnter={() => openMouse('agregar')} onMouseLeave={closeMouse}>
        <Tooltip title={active === "agregar" ? 'Agregar' : ''}>
            <div>
           
                <span className="text">Agregar nueva rutina</span>
            </div>
        </Tooltip>
    </button>

    )
}