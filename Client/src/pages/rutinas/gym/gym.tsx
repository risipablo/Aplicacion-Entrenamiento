// import { useEffect, useState } from "react";
// import { getExercises } from "../../../components/data/dataGym";
// import { Exercise } from "../../../components/interface/interfaces";

import { useState } from "react";
import "./gym.css";
import { useGym } from "../../../components/hooks/useGym";

export function Gym() {
    const {
        gym,
        handleAddGym,
    } = useGym()

    const [title, setTitle] = useState<string>("");
    const [muscle, setMuscle] = useState<string>("");
    const [series, setSeries] = useState<string>("");
    const [reps, setReps] = useState<string>("");

    const addGym = () => {
        if (title.trim() && muscle.trim() && series.trim() && reps.trim() !== "") {
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

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="gym-container">
            <button className="btn-outlined" onClick={handleOpen}>
                <span className="icon-notification" style={{ display: "none" }}> abrir</span>
            </button>

            {open && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Notas</h2>
                            <button className="btn-close" onClick={handleClose}>✖</button>
                        </div>
                        <div className="modal-body">
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" />
                            <input type="text" value={muscle} onChange={(e) => setMuscle(e.target.value)} placeholder="Músculo" />
                            <input type="number" value={series} onChange={(e) => setSeries(e.target.value)} placeholder="Series" />
                            <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} placeholder="Repeticiones" />
                            <button onClick={addGym}>Agregar</button>
                        </div>

                        <div className="routine-list">
                            {gym.map((e, index) => (
                                <div key={index} className="routine">
                                    <h3>{e.title}</h3>
                                    <p>{e.muscle}</p>
                                    <p>{e.series}</p>
                                    <p>{e.reps}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}