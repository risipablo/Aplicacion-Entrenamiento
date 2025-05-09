import { useState } from 'react';
import '../../../styles/pages.css';
import { Dialog, DialogContent, DialogActions, DialogTitle, Button, TextField, MenuItem, Select } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useNatacion } from '../../../utils/hooks/useNatacion';
import { NatacionList } from '../../../utils/interface/interfaces';
import { AddButtonRoutine } from '../../../components/common/addButtonRoutine';
import { TransitionGroup } from 'react-transition-group';



export function Natacion() {

    const {
        natacion,
        error,
        handleAddSwin,
        handleDeleteSwin,
        handleUpdateSwin,
        handleAddRoutine,
        handleDeleteRoutine
    } = useNatacion();

    const [day, setDay] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [routine, setRoutine] = useState<string>("")
    const [piletas, setPiletas] = useState<string>("")
    const [meters, setMeters] = useState<string>("")
    const [newSeries, setNewSeries] = useState<{ [key: string]: string }>({});
    const [newRoutine, setNewRoutine] = useState<{ [key: string]: string }>({});
    const [newMeters, setNewMeters] = useState<{ [key: string]: string }>({});
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingData, setEditingData] = useState({
        day: '',
        title: '',
        piletas: [] as string[],
        meters: [] as string[],
        routine: [] as string[],
    });
    const [showInputs, setShowInputs] = useState(true);


    const addSwin = () => {
        if (String(day).trim() && title.trim() && routine.trim() && piletas.trim() && meters.trim() !== "") {
            handleAddSwin({
                day,
                title,
                meters: [meters],
                routine: [routine],
                piletas: [piletas],
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

    const editSwin = (swin: NatacionList) => {
        setEditingId(swin._id);
        setEditingData({
            day: swin.day,
            title: swin.title,
            piletas:  swin.piletas,
            meters:  swin.meters,
            routine: swin.routine,
        });
    };


    const saveSwin = (id: number) => {
        handleUpdateSwin(id, {
            ...editingData,
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
            meters: [],
            piletas: [],
        })
        // cancelEditingRoutine()
    }

   
    // edicion de nuevas rutinas

    type EditingState = {
        routineIndex: number | null;
        routineValue: string;
        metersIndex: number | null;
        metersValue: string;
        seriesIndex: number | null;
        seriesValue: string;
    };
    
    const [editingState, setEditingState] = useState<{ [key: number]: EditingState }>({});

    // Agregar rutinas internas
    const addRoutine = (id: number) => {
        const seriesToAdd = newSeries[id]
        const metersToAdd = newMeters[id];
        const routineToAdd = newRoutine[id];
       
        
        if ( seriesToAdd && seriesToAdd !== "" && metersToAdd && metersToAdd.trim() !== "" &&  routineToAdd && routineToAdd.trim() !== "" ) {
            handleAddRoutine(id, seriesToAdd, metersToAdd, routineToAdd);
            setNewSeries({...newSeries, [id]: ""})
            setNewMeters({ ...newMeters, [id]: "" });
            setNewRoutine({ ...newRoutine, [id]: "" });
            
        }
    };

    // funcion de comenzar editar rutinas internas
    const editingRoutine = (id: number, index: number, routineValue: string, metersValue: string, seriesValue: string) => {
        setEditingState({
            ...editingState,
            [id]: {
                routineIndex: index,
                routineValue,
                metersIndex: index,
                metersValue,
                seriesIndex: index,
                seriesValue,
            },
        });
    };

    
    const saveEditedRoutine = (id: number) => {
        const currentEditing = editingState[id];
        if (currentEditing && currentEditing.routineIndex !== null && currentEditing.metersIndex !== null && currentEditing.seriesIndex !== null) {
            const swinToUpdate = natacion.find(swin => swin._id === id);
            if (swinToUpdate) {
                const updatedRoutines = [...swinToUpdate.routine];
                const updatedMeters = [...swinToUpdate.meters];
                const updatedSeries = [...swinToUpdate.piletas];
    
                updatedRoutines[currentEditing.routineIndex] = currentEditing.routineValue;
                updatedMeters[currentEditing.metersIndex] = currentEditing.metersValue;
                updatedSeries[currentEditing.seriesIndex] = currentEditing.seriesValue;
    
                handleUpdateSwin(id, {
                    routine: updatedRoutines,
                    meters: updatedMeters,
                    piletas: updatedSeries,
                });
    
                // Limpiar el estado de edición para esta rutina
                setEditingState({
                    ...editingState,
                    [id]: {
                        routineIndex: null,
                        routineValue: "",
                        metersIndex: null,
                        metersValue: "",
                        seriesIndex: null,
                        seriesValue: "",
                    },
                });
            }
        }
    };

    const deleteRoutineIndex = (id: number, indexRoutine: number) => {
        handleDeleteRoutine(id, indexRoutine);
    };


    const cancelEditingRoutine = (id: number) => {
        setEditingState({
            ...editingState,
            [id]: {
                routineIndex: null,
                routineValue: "",
                metersIndex: null,
                metersValue: "",
                seriesIndex: null,
                seriesValue: "",
            },
        });
    };
    

    // Mostrar iconos de edicion
    const [active,setActive] = useState<string | null>(null);

    const open = (icon:string) => {
        setActive(icon)
    }

    const close = () => {
        setActive(null)
    }

  

    
    // Funcion para que se muestra la opcion de agregar más rutinas
    const [addNewRoutine, setAddNewRoutine] = useState<number | null>(null);
    const [handleButton, setHandleButton] = useState<number | null>(null)

    const handleAddRoutineToggle = (id: number) => {
        setAddNewRoutine(addNewRoutine === id ? null : id);
    }


    const functionButtons = (id:number) => {
        setHandleButton(handleButton === id ? null : id)
    }
    

    const calcularMetros = (swin: NatacionList) => {
        return swin.meters.reduce((total, meter) => total + parseInt(meter), 0)
    }

    const calcularSeries = (swin:NatacionList) => {
        return swin.piletas.reduce((total, serie) => total + parseInt(serie), 0)
    }


    const metrosTotales = (swin:NatacionList) => {
        return calcularMetros(swin) * calcularSeries(swin)
    }

    const piletasTotales = (swin:NatacionList) => {
        const total = metrosTotales(swin) / 34

        return Math.ceil(total)
    }

    // Abrir inputs de rutina
    const [opens, setOpen] = useState(false); 

    const handleOpen = () => setOpen(true); 
    const handleClose = () => setOpen(false); 

    return (
        <div className="gym-container">
            <h2> Natación</h2>

            <div className="add-container">
                <AddButtonRoutine onOpen={handleOpen} />
            </div>

            {opens && (
                <Dialog open={opens} onClose={handleClose} maxWidth="md" fullWidth>
                    <DialogTitle>
                        <Tooltip title="Cerrar">
                            <Button onClick={handleClose} color="secondary" style={{ position: "absolute", top: 10, right: 15 }}>
                                <CancelIcon sx={{ fontSize: "1.8rem" }} />
                            </Button>
                        </Tooltip>
                    </DialogTitle>
                    <DialogContent
                        style={{
                            padding: "1rem",
                            margin: '1.8rem 0',
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.2rem",
                            alignItems: "center"
                        }}
                    >
                        <Select
                            sx={{ minWidth: "80%", fontSize: "0.9rem" }}
                            value={day}
                            onChange={(event) => setDay(event.target.value)}
                            displayEmpty
                            variant="standard"
                        >
                            <MenuItem value="">
                                <em>Elegir Día</em>
                            </MenuItem>
                            {[...Array(31)].map((_, index) => (
                                <MenuItem key={index + 1} value={index + 1}>
                                    {index + 1}
                                </MenuItem>
                            ))}
                        </Select>

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
                            value={piletas}
                            onChange={(e) => setPiletas(e.target.value)}
                            variant="standard"
                        />
                        <TextField
                            sx={{ minWidth: "80%", fontSize: "0.9rem" }}
                            margin="dense"
                            label="Metros"
                            value={meters}
                            onChange={(e) => setMeters(e.target.value)}
                            variant="standard"
                        />
                        <TextField
                            sx={{ minWidth: "80%", fontSize: "0.9rem" }}
                            margin="dense"
                            label="Rutina"
                            value={routine}
                            onChange={(e) => setRoutine(e.target.value)}
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions style={{ padding: "20px", justifyContent: "center"}} >
                        <Tooltip title="Agregar nueva rutina">
                            <Button onClick={addSwin} color="primary">
                                <AddCircleOutlineIcon sx={{ fontSize: "1.8rem" }} />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Borrar todos los campos">
                            <Button onClick={cleanInputs} color="primary">
                                <RemoveCircleIcon sx={{ fontSize: "1.8rem" }} />
                            </Button>
                        </Tooltip>
                    </DialogActions>
                </Dialog>
            )}

            {error && <div className="error">{error}</div>}

            <Button
                
                onClick={() => setShowInputs(!showInputs)}
                startIcon={showInputs ? <ExpandLess /> : <ExpandMore />}
                sx={{ marginBottom: 2 }}
            >
                {showInputs ? '' : '' } 
            </Button>

            <TransitionGroup>
                {!showInputs && (
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
                                                           placeholder='Ingresar Series'
                                                           value={newSeries[e._id] || ""}
                                                           onChange={(event) => setNewSeries({ ...newSeries, [e._id]: event.target.value })}
                                                       />
               
                                                       <input
                                                           type="text"
                                                           placeholder='Ingresar Metros'
                                                           value={newMeters[e._id] || ""}
                                                           onChange={(event) => setNewMeters({ ...newMeters, [e._id]: event.target.value })}
                                                       />
               
               
                                                       <input
                                                           type="text"
                                                           placeholder='Ingresar Nuevo Ejercicio'
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
               
                                               {/* Edicion de rutinas */}
                                               <h4>Rutina</h4>
                                               {e.routine.map((r, i) => (
                                                   <div key={i} className='routine-container'>
                                                       {editingState[e._id]?.routineIndex === i ? (
                                                           <div>
                                                               <input
                                                                   type="text"
                                                                   value={editingState[e._id].seriesValue}
                                                                   onChange={(event) =>
                                                                       setEditingState({
                                                                           ...editingState,
                                                                           [e._id]: {
                                                                               ...editingState[e._id],
                                                                               seriesValue: event.target.value,
                                                                           },
                                                                       })
                                                                   }
                                                                   placeholder="Ingresar Serie"
                                                               />
                                                               <input
                                                                   type="text"
                                                                   value={editingState[e._id].metersValue}
                                                                   onChange={(event) =>
                                                                       setEditingState({
                                                                           ...editingState,
                                                                           [e._id]: {
                                                                               ...editingState[e._id],
                                                                               metersValue: event.target.value,
                                                                           },
                                                                       })
                                                                   }
                                                                   placeholder="Ingresar Metros"
                                                               />
                                                               <input
                                                                   type="text"
                                                                   value={editingState[e._id].routineValue}
                                                                   onChange={(event) =>
                                                                       setEditingState({
                                                                           ...editingState,
                                                                           [e._id]: {
                                                                               ...editingState[e._id],
                                                                               routineValue: event.target.value,
                                                                           },
                                                                       })
                                                                   }
                                                                   placeholder="Ingresar Rutina"
                                                               />
                                                               <button  className="check" onClick={() => saveEditedRoutine(e._id)}>
                                                                   <Tooltip title="Guardar">
                                                                       <SaveIcon />
                                                                   </Tooltip>
                                                               </button>
                                                               <button className="cancel"  onClick={() => cancelEditingRoutine(e._id)}>
                                                                   <Tooltip title="Cancelar">
                                                                       <CancelIcon />
                                                                   </Tooltip>
                                                               </button>
                                                               <button className="delete" onClick={() => deleteRoutineIndex(e._id, i)}>
                                                                   <Tooltip title="Eliminar">
                                                                       <DeleteIcon />
                                                                   </Tooltip>
                                                               </button>
                                                           </div>
                                                       ) : (
                                                           <p onClick={() => editingRoutine(e._id, i, r, e.meters[i], e.piletas[i])}>
                                                               {e.piletas[i]} series X {e.meters[i]} metros de {r}
                                                           </p>
                                                       )}
                                                   </div>
                                               ))}
                                           </div>
               
                                           <div className="container-data">
                                               <h4> Resultados </h4>
                                               <p>Piletas Totales: {piletasTotales(e)} Piletas</p>
                                               <p>Metros Totales: {metrosTotales(e)} Metros</p>
                                               <p>Km Totales: {(metrosTotales(e) / 1000).toFixed(1)}  Km</p>
                                           </div>
               
                                       </div>
                                   </div>
               
                               ))}
                           </div>
                )}
 
            </TransitionGroup>
        </div>
    )
}