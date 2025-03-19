// import { useEffect, useState } from "react";
// import { getExercises } from "../../../components/data/dataGym";
// import { Exercise } from "../../../components/interface/interfaces";
import { useState } from "react";
import "../../../styles/pages.css";
import { useGym } from "../../../components/hooks/useGym";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Tooltip } from "@mui/material";

export function Gym() {
    const {
        gym,
        handleAddGym,
        handleDeleteGym
    } = useGym()

    const [title, setTitle] = useState<string>("");
    const [muscle, setMuscle] = useState<string>("");
    const [series, setSeries] = useState<string>("");
    const [reps, setReps] = useState<string>("");

    const addGym = () => {
        if (title.trim() && muscle.trim() && series.trim() && reps.trim()) {
            handleAddGym({
                title,
                muscle,
                series,
                reps
            });
            setTitle("");
            setMuscle("");
            setSeries('');
            setReps('')
        }
    };

    const deleteGym = (id: number) => {
        handleDeleteGym(id)
    }

    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<string | boolean>(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const openMouse = (icon:any) => {
        setActive(icon)
    }

    const closeMouse = () => {
        setActive(false)
    }

    return (
        <div className="gym-container">

         <button className="btn-outlined" onClick={handleOpen} onMouseEnter={() => openMouse('agregar')} onMouseLeave={closeMouse}>
                <Tooltip title={active === "agregar" ? 'Agregar' : ''}>
                    <div>
                        <AddCircleOutlineIcon/>
                        <span className="text">Agregar nueva rutina</span>
                    </div>
                </Tooltip>
            </button>

            {open && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Rutina</h2>
                            <button className="btn-close" onClick={handleClose}>✖</button>
                        </div>

                        <div className="modal-body">
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" />
                            <input type="text" value={muscle} onChange={(e) => setMuscle(e.target.value)} placeholder="Músculo" />
                            <input type="text" value={series} onChange={(e) => setSeries(e.target.value)} placeholder="Series" />
                            <input type="text" value={reps} onChange={(e) => setReps(e.target.value)} placeholder="Repeticiones" />
                            <button onClick={addGym}>Agregar</button>
                        </div>


                    </div>

                </div>
            )}

                <div className="lista-routine">
                    <h2> Rutinas Agregadas</h2>
                    {gym.length === 0 ? (
                        <p>No tienes rutinas agregadas</p>
                    ) : (gym.map((e, index) => (
                        <div key={index} className="routine">
                            <button onClick={() => deleteGym(e._id)}>Eliminar</button>
                            <h3>{e.title}</h3>
                            <p>{e.muscle}</p>
                            <p>{e.series} series</p>
                            <p>{e.reps} reps </p>
                        </div>
                    ))
                )}
                </div>
        </div>
    );
}