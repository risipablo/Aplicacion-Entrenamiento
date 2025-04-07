// import { useEffect, useState } from "react";
// import { getExercises } from "../../../components/data/dataGym";
// import { Exercise } from "../../../components/interface/interfaces";
import { useState } from "react";
import "../../../styles/pages.css";
import { useGym } from "../../../utils/hooks/useGym";
import { AddButtonRoutine } from "../../../components/common/addButtonRoutine";
import { Dialog, DialogContent, DialogActions, DialogTitle, Button, TextField, Tooltip } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CancelIcon from '@mui/icons-material/Cancel';

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

    const resetInputs = () => {
        setTitle("");
        setMuscle("");
        setSeries('');
        setReps('')
    }

    const [open, setOpen] = useState(false); 

    const handleOpen = () => setOpen(true); 
    const handleClose = () => setOpen(false); 


    return (
        <div className="gym-container">
            <AddButtonRoutine onOpen={handleOpen}/>

            {open && (
                <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                    <DialogTitle>
                        <Tooltip title="Cerrar">
                            <Button onClick={handleClose} color="secondary" style={{ position: "absolute", top: 10, right: 15 }}>
                                <CancelIcon />
                            </Button>
                        </Tooltip>
                    </DialogTitle>
                    <DialogContent
                        style={{
                            padding: "1rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.8rem",
                            alignItems: "center"
                        }}
                    >
                        <TextField
                            sx={{ minWidth: "80%", fontSize: "0.9rem" }}
                            margin="dense"
                            label="Título"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            variant="standard"
                        />
                        <TextField
                            sx={{ minWidth: "80%", fontSize: "0.9rem" }}
                            margin="dense"
                            label="Series"
                            value={muscle}
                            onChange={(e) => setMuscle(e.target.value)}
                            variant="standard"
                        />
                        <TextField
                            sx={{ minWidth: "80%", fontSize: "0.9rem" }}
                            margin="dense"
                            label="Metros"
                            value={series}
                            onChange={(e) => setSeries(e.target.value)}
                            variant="standard"
                        />
                        <TextField
                            sx={{ minWidth: "80%", fontSize: "0.9rem" }}
                            margin="dense"
                            label="Rutina"
                            value={reps}
                            onChange={(e) => setReps(e.target.value)}
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions style={{ padding: "20px", justifyContent: "center" }}>
                        <Tooltip title="Agregar nueva rutina">
                            <Button onClick={addGym} color="primary">
                                <AddCircleOutlineIcon />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Borrar todos los campos">
                            <Button onClick={resetInputs} color="primary">
                                <RemoveCircleIcon />
                            </Button>
                        </Tooltip>
                    </DialogActions>
                </Dialog>
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