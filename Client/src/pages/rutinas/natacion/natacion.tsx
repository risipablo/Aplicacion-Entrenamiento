import { useEffect, useState } from 'react';
import '../../../styles/pages.css';
import axios from 'axios';

import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface NatacionList {
    _id: number,
    day: string,
    title: string,
    routine: string[],
    piletas: number,
    meters: number
}

const serverFront = 'http://localhost:3001'

export function Natacion() {

    const [natacion, setNatacion] = useState<NatacionList[]>([])
    const [day, setDay] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [routine, setRoutine] = useState<string>("")
    const [piletas, setPiletas] = useState<string>("")
    const [meters, setMeters] = useState<string>("")
    const [error, setError] = useState<string | null>(null);
    const [newRoutine, setNewRoutine] = useState<{ [key: number]: string }>({});
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingData, setEditingData] = useState({
        day: '',
        title: '',
        piletas: '',
        meters: '',
        routine: [] as string[],
    });

    // edicion de nuevas rutinas
    const [editingRoutineIndex,setEditingRoutineIndex] = useState<number | null>(null)
    const [editingRoutineValue,setEditingRoutineValue] = useState<string>("")

    useEffect(() => {
        axios.get(`${serverFront}/api/swin`)
            .then(response => {
                setNatacion(response.data)
            })
            .catch(err => setError(err.message))
    }, [])

    const addSwin = () => {
        if (day.trim() && title.trim() && routine.trim() && piletas.trim() && meters.trim() !== "") {
            axios.post(`${serverFront}/api/add-swin`, {
                day: day,
                title: title,
                routine: [routine],
                piletas: Number(piletas),
                meters: Number(meters)
            })
                .then(response => {
                    const swinData = response.data;
                    setNatacion(natacion => [...natacion, swinData])
                    setDay("");
                    setTitle("");
                    setRoutine("")
                    setMeters("");
                    setPiletas("")
                })
                .catch(err => setError(err.message))
        }
    }

    const addRoutine = (id: number) => {
        const routineToAdd = newRoutine[id];
        if (routineToAdd && routineToAdd.trim() !== "") {
            axios.put(`${serverFront}/api/swin/${id}/add-routine`, { newRoutine: routineToAdd })
                .then(response => {
                    setNatacion(natacion.map(nat => 
                        nat._id === id ? response.data : nat
                    ));
                    setNewRoutine({ ...newRoutine, [id]: "" }); // Limpia el input después de agregar
                })
                .catch(err => setError(err.message));
        }
    };

    const deleteSwin = (id: number) => {
        axios.delete(`${serverFront}/api/swin/${id}`)
            .then(response => {
                const updatedNatacion = natacion.filter((natacio) => natacio._id !== id)
                setNatacion(updatedNatacion)
            })
            .catch(err => console.log(err))
    }

    const cleanInputs = () => {
        setDay("")
        setMeters("")
        setPiletas("")
        setRoutine("")
        setTitle("")
    }

    const editSwin = (swin: NatacionList) => {
        setEditingId(swin._id)
        setEditingData({
            day: swin.day,
            title: swin.title,
            piletas: String(swin.piletas),
            meters: String(swin.meters),
            routine: swin.routine,
        })
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditingData({
            day: '',
            title: '',
            routine: [],
            meters: '',
            piletas: '',
        })
        cancelEditingRoutine()
    }

    const saveSwin = (id: number) => {
        axios.patch(`${serverFront}/api/swin/${id}`, {
            ...editingData, // Envía todos los campos
            piletas: Number(editingData.piletas),
            meters: Number(editingData.meters),
        })
        .then(response => {
            setNatacion(natacion.map(swin => swin._id === id ? response.data : swin));
            cancelEdit();
        })
        .catch(err => console.log(err));
    };

    // funcion de comenzar editar rutinas internas
    const editingRoutine = (index: number, value: string) => {
        setEditingRoutineIndex(index); // Establece el índice de la rutina que se está editando
        setEditingRoutineValue(value); // Establece el valor temporal de la rutina
    };

    
    const saveEditedRoutine = (id: number) => {
        if (editingRoutineIndex !== null) {
            const updatedRoutines = [...editingData.routine];
            updatedRoutines[editingRoutineIndex] = editingRoutineValue; // Actualiza la rutina editada
    
          
            const updatedData = {
                ...editingData,
                routine: updatedRoutines,
            };
            setEditingData(updatedData);
    
            // Envía la actualización al backend
            axios.patch(`${serverFront}/api/swin/${id}`, {
                // ...updatedData, // Envía todos los campos, no solo las rutinas
                // piletas: Number(updatedData.piletas),
                // meters: Number(updatedData.meters),
            })
            .then(response => {
                setNatacion(natacion.map(swin => swin._id === id ? response.data : swin));
                cancelEditingRoutine(); // Cancela la edición después de guardar
            })
            .catch(err => console.log(err));
        }
    };

    const deleteRoutines = (id: number, routineIndex: number) => {
        // Verifica si hay rutinas para eliminar
        if (editingData.routine.length === 0) {
            console.log("No hay rutinas para eliminar.");
            return;
        }
    
        // Crea una copia de las rutinas y elimina la rutina en el índice especificado
        const updatedRoutines = [...editingData.routine];
        updatedRoutines.splice(routineIndex, 1);
    
        // Actualiza el estado de edición
        const updatedData = {
            ...editingData,
            routine: updatedRoutines,
        };
        setEditingData(updatedData);
    
        // Envía la actualización al backend
        axios.patch(`${serverFront}/api/swin/${id}`, {
            ...updatedData, // Envía todos los campos
            piletas: Number(updatedData.piletas),
            meters: Number(updatedData.meters),
        })
        .then(response => {
            // Actualiza el estado `natacion` con la respuesta del backend
            setNatacion(natacion.map(swin => swin._id === id ? response.data : swin));
        })
        .catch(err => console.log(err));
    };


    const cancelEditingRoutine = () => {
        setEditingRoutineIndex(null)
        setEditingRoutineValue("")
    }

    const kmTotal = (piletas:number, meters:number ) => {
        const piletasTotal = Number(piletas);
        const metersTotal = Number(meters);

        return piletasTotal * metersTotal;
    }

    const [active,setActive] = useState<string | null>(null);

    const open = (icon:string) => {
        setActive(icon)
    }

    const close = () => {
        setActive(null)
    }

    const [addNewRoutine, setAddNewRoutine] = useState<number | null>(null);

    const handleAddRoutine = (id: number) => {
        setAddNewRoutine(addNewRoutine === id ? null : id);
    }
    
    return (
        <div className="pages-container">
            <h2> Natación</h2>

            <div className="inputs-workout">
                <select value={day} onChange={(e) => setDay(e.target.value)}>
                    <option value=""><em> Dia </em> </option>
                    {[...Array(12)].map((_, index) => (
                        <option key={index + 1} value={index + 1}> {index + 1} </option>
                    ))}
                </select>
                <input type="text" placeholder='Ingresar Titulo' value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder='Ingresar Rutina' value={routine} onChange={(e) => setRoutine(e.target.value)} />
                <input type="number" placeholder='Ingresar Piletas Totales' value={piletas} onChange={(e) => setPiletas(e.target.value)} />
                <input type="number" placeholder='Ingresar Metros Totales' value={meters} onChange={(e) => setMeters(e.target.value)} />
            </div>

            <div className="boton-inputs">
                <button className="add" onClick={addSwin}>Agregar</button>
                <button className="clean" onClick={cleanInputs}>Limpiar</button>
            </div>

            {error && <div className="error">{error}</div>}

            <div className="list-routine">
            {natacion.map((e, index) => (
                <div key={index} className="note-card">

                    <div className="buttons">
                        {editingId === e._id ? (
                        <div className='btn-edit'>

                            <button className="check" onMouseEnter={() => open('guardar')} onMouseLeave={close} onClick={() => saveSwin(e._id)}>
                               <Tooltip title={active === 'guardar' ? "Guardar" : " "}>
                                    <SaveIcon/> 
                                </Tooltip> 
                            </button>

                            <button className="cancel" onClick={cancelEdit} onMouseEnter={() => open('cancelar')} onMouseLeave={close}>
                                <Tooltip title={active === 'cancelar' ? "Cancelar" : " "}>
                                    <CancelIcon/> 
                                </Tooltip>
                            
                                </button>
                        </div>
                            ) : (
                                <button className="edit" onClick={() => editSwin(e)} onMouseEnter={() => open('editar')} onMouseLeave={close}>
                                    <Tooltip title={active === 'editar' ? "Editar" : " "}>
                                        <CreateIcon/> 
                                    </Tooltip>
                                </button>
                            )}

                        <button onClick={() => deleteSwin(e._id)} onMouseEnter={() => open('eliminar')} onMouseLeave={close} className='delete'> 
                            <Tooltip title={active === 'eliminar' ? "Eliminar" : " "}>
                                <DeleteIcon/> 
                            </Tooltip>
                        </button>
                    </div>
                   
                   <div className="container-routine">

                        <div className="title">
                            <h3>Dia {editingId === e._id ? <input value={editingData.day} onChange={(e) => setEditingData({...editingData, day: e.target.value})} /> : e.day}  </h3>
                            <h4> {editingId === e._id ? <input value={editingData.title} onChange={(e) => setEditingData({...editingData, title: e.target.value})} /> : e.title}</h4>
                        </div>

                        <div className='routine'>

                        <button className='button-plus' onMouseEnter={() => open('agregar más')} onMouseLeave={close} onClick={() => handleAddRoutine(e._id)}> 
                            <Tooltip title={active === 'agregar más' ? "Agregar Más" : " "}>
                                <AddCircleOutlineIcon/> 
                            </Tooltip>
                        </button>

                        {addNewRoutine === e._id && (
                            <div className="new-routine-input">
                                <input 
                                    type="text" 
                                    placeholder='Ingresar nueva rutina' 
                                    value={newRoutine[e._id] || ""} 
                                    onChange={(event) => setNewRoutine({ ...newRoutine, [e._id]: event.target.value })} 
                                />
                                <button onClick={() => addRoutine(e._id)} className='routine-plus'> 
                                    <AddIcon/> 
                                </button>
                            </div>
                        )}

                            <h4>Rutina</h4>
                            {e.routine.map((r, i) => (
                                <div key={i} className='routine-container'>
                                    {editingRoutineIndex === i ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={editingRoutineValue}
                                                onChange={(e) => setEditingRoutineValue(e.target.value)}
                                            />

                                            <button className="check" onMouseEnter={() => open('guardar')} onMouseLeave={close} onClick={() => saveEditedRoutine(e._id)}>
                                            <Tooltip title={active === 'guardar' ? "Guardar" : " "}>
                                                    <SaveIcon/> 
                                                </Tooltip> 
                                            </button>

                                            <button className="cancel" onClick={cancelEditingRoutine} onMouseEnter={() => open('cancelar')} onMouseLeave={close} >                     
                                                <Tooltip title={active === 'cancelar' ? "Cancelar" : " "}>
                                                    <CancelIcon/> 
                                                </Tooltip>
                                            </button>

                                            <button onClick={() => deleteRoutines(e._id, i)}  onMouseEnter={() => open('eliminar')} onMouseLeave={close}  className='delete'> 
                                                <Tooltip title={active === 'eliminar' ? "Eliminar" : " "}>
                                                    <DeleteIcon/> 
                                                </Tooltip> 
                                            </button>
                                                        
                                        </div>
                                    ) : (
                                        <p onClick={() => editingRoutine(i, r)}>{r}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="container-data">
                            <p>Piletas totales: {editingId === e._id ? <input value={editingData.piletas} onChange={(e) => setEditingData({...editingData, piletas: e.target.value})} /> : e.piletas} </p>
                            <p>Metros totales: {editingId === e._id ? <input value={editingData.meters} onChange={(e) => setEditingData({...editingData, meters: e.target.value})} /> : e.meters} mts </p>

                            <p className='km'>Kilometros total: {kmTotal(e.piletas, e.meters)} Km</p>
                        </div>
                                        
                    </div>
                </div>

                
            ))}
            </div>

        </div>
    )
}