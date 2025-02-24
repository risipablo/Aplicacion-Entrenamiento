import { useState } from 'react';
import '../../../styles/pages.css';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNatacion } from '../../../components/hooks/useNatacion';
import { NatacionList } from '../../../components/interface/interfaces';



export function Natacion() {

    const {
        natacion,
        error,
        handleAddSwin,
        handleDeleteSwin,
        handleUpdateSwin,
        handleAddRoutine,
    } = useNatacion();

    const [day, setDay] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [routine, setRoutine] = useState<string>("")
    const [piletas, setPiletas] = useState<string>("")
    const [meters, setMeters] = useState<string>("")
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

    const addSwin = () => {
        if (day.trim() && title.trim() && routine.trim() && piletas.trim() && meters.trim() !== "") {
            handleAddSwin({
                day,
                title,
                routine: [routine],
                piletas: Number(piletas),
                meters: Number(meters),
            });
            setDay("");
            setTitle("");
            setRoutine("");
            setPiletas("");
            setMeters("");
        }
    };


    const deleteSwin = (id: number) => {
        handleDeleteSwin(id);
    };

    const editSwin = (swin:NatacionList ) => {
        setEditingId(swin._id);
        setEditingData({
            day: swin.day,
            title: swin.title,
            piletas: String(swin.piletas),
            meters: String(swin.meters),
            routine: swin.routine,
        });
    };


    const saveSwin = (id: number) => {
        handleUpdateSwin(id, {
            ...editingData,
            piletas: Number(editingData.piletas),
            meters: Number(editingData.meters),
        });
        setEditingId(null);
    };


    const cleanInputs = () => {
        setDay("")
        setMeters("")
        setPiletas("")
        setRoutine("")
        setTitle("")
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

   

    // Agregar rutinas internas
    const addRoutine = (id: number) => {
        const routineToAdd = newRoutine[id];
        if (routineToAdd && routineToAdd.trim() !== "") {
            handleAddRoutine(id, routineToAdd);
            setNewRoutine({ ...newRoutine, [id]: "" });
        }
    };

    // funcion de comenzar editar rutinas internas
    const editingRoutine = (index: number, value: string) => {
        setEditingRoutineIndex(index); // Establece el índice de la rutina que se está editando
        setEditingRoutineValue(value); // Establece el valor temporal de la rutina
    };

    
    const saveEditedRoutine = (id: number) => {
        if (editingRoutineIndex !== null) {
            // Obtén el elemento que se está editando
            const swinToUpdate = natacion.find(swin => swin._id === id);
            
            if (swinToUpdate) {
                // Crea una copia de las rutinas existentes
                const updatedRoutines = [...swinToUpdate.routine];
                
                // Actulizar la rutina que se está editando en la copa 
                updatedRoutines[editingRoutineIndex] = editingRoutineValue;
                
                // llama a las rutinas acutales
                handleUpdateSwin(id, {
                    routine: updatedRoutines, // Solo actualizar el campo de rutinas
                });
                
                // Cancela la edición
                cancelEditingRoutine();
            }
        }
    };
    // const deleteRoutines = (id: number, routineIndex: number) => {
    //     if (editingData.routine.length === 0) {
    //         console.log("No hay rutinas para eliminar.");
    //         return;
    //     }

    //     const updatedRoutines = [...editingData.routine];
    //     updatedRoutines.splice(routineIndex, 1);

    //     const updatedData = {
    //         ...editingData,
    //         routine: updatedRoutines,
    //     };
    //     setEditingData(updatedData);

    //     handleUpdateSwin(id, updatedData);
    // };

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

    // Mostrar iconos de edicion

    
    // Funcion para que se muestra la opcion de agregar más rutinas
    const [addNewRoutine, setAddNewRoutine] = useState<number | null>(null);
    const [handleButton, setHandleButton] = useState<number | null>(null)

    const handleAddRoutineToggle = (id: number) => {
        setAddNewRoutine(addNewRoutine === id ? null : id);
    }


    const functionButtons = (id:number) => {
        setHandleButton(handleButton === id ? null : id)
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
                    <div key={index} className="note-card" onClick={() => functionButtons(e._id)}>

                        <div className="buttons">
                            {editingId === e._id ? (
                                <div className='btn-edit'>
                                    <button className="check" onMouseEnter={() => open('guardar')} onMouseLeave={close} onClick={() => saveSwin(e._id)}>
                                        <Tooltip title={active === 'guardar' ? "Guardar" : " "}>
                                            <SaveIcon />
                                        </Tooltip>
                                    </button>
                                    <button className="cancel" onClick={cancelEdit} onMouseEnter={() => open('cancelar')} onMouseLeave={close}>
                                        <Tooltip title={active === 'cancelar' ? "Cancelar" : " "}>
                                            <CancelIcon />
                                        </Tooltip>
                                    </button>
                                </div>
                            ) : (
                                handleButton === e._id && (
                                    <>
                                        <button className="edit" onClick={() => editSwin(e)} onMouseEnter={() => open('editar')} onMouseLeave={close}>
                                            <Tooltip title={active === 'editar' ? "Editar" : " "}>
                                                <CreateIcon />
                                            </Tooltip>
                                        </button>
                                        <button onClick={() => deleteSwin(e._id)} onMouseEnter={() => open('eliminar')} onMouseLeave={close} className='delete'>
                                            <Tooltip title={active === 'eliminar' ? "Eliminar" : " "}>
                                                <DeleteIcon />
                                            </Tooltip>
                                        </button>
                                    </>
                                )
                            )}
                        </div>

                        <div className="container-routine">

                            <div className="title">
                                <h3>Dia {editingId === e._id ? <input value={editingData.day} onChange={(e) => setEditingData({ ...editingData, day: e.target.value })} /> : e.day}  </h3>
                                <h4> {editingId === e._id ? <input value={editingData.title} onChange={(e) => setEditingData({ ...editingData, title: e.target.value })} /> : e.title}</h4>
                            </div>

                            <div className='routine'>

                                <button className='button-plus' onMouseEnter={() => open('agregar más')} onMouseLeave={close} onClick={() => handleAddRoutineToggle(e._id)}>
                                    <Tooltip title={active === 'agregar más' ? "Agregar Más" : " "}>
                                        <AddCircleOutlineIcon />
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
                                        <button onClick={() => addRoutine(e._id)} className='routine-plus' onMouseEnter={() => open('agregar rutina')} onMouseLeave={close}>
                                            <Tooltip title={active === 'agregar rutina' ? "Agregar Rutina" : " "}>
                                                <AddIcon />
                                            </Tooltip>
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
                                                        <SaveIcon />
                                                    </Tooltip>
                                                </button>

                                                <button className="cancel" onClick={cancelEditingRoutine} onMouseEnter={() => open('cancelar')} onMouseLeave={close}>
                                                    <Tooltip title={active === 'cancelar' ? "Cancelar" : " "}>
                                                        <CancelIcon />
                                                    </Tooltip>
                                                </button>

                                                {/* <button onClick={() => deleteRoutines(e._id, i)} onMouseEnter={() => open('eliminar')} onMouseLeave={close} className='delete'>
                                                    <Tooltip title={active === 'eliminar' ? "Eliminar" : " "}>
                                                        <DeleteIcon />
                                                    </Tooltip>
                                                </button> */}

                                            </div>
                                        ) : (
                                            <p onClick={() => editingRoutine(i, r)}>{r}</p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="container-data">
                                <p>Piletas totales: {editingId === e._id ? <input value={editingData.piletas} onChange={(e) => setEditingData({ ...editingData, piletas: e.target.value })} /> : e.piletas} </p>
                                <p>Metros totales: {editingId === e._id ? <input value={editingData.meters} onChange={(e) => setEditingData({ ...editingData, meters: e.target.value })} /> : e.meters} mts </p>

                                <p className='km'>Kilometros total: {kmTotal(e.piletas, e.meters)} Km</p>
                            </div>

                        </div>
                    </div>

                ))}
            </div>

        </div>
    )
}