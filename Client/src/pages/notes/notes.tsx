import { useState } from "react"
import { useNote } from "../../components/hooks/useNote"
import { NotesList } from "../../components/interface/interfaces"



export function Notes(){

    const {
        note,
        error,
        handleAddNote,
        handleDeleteNote,
        handleUpdateNote
    } = useNote()

    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingData, setEditingData] = useState({
        title: '',
        description: '',
        date:''
    });

    const addNote = () => {
        if (title.trim() && description.trim() && date.trim() !== "")
            handleAddNote({
        title,
        description,
        date
        })

        setTitle("")
        setDate("")
        setDescription("")
    }

    const deleteNote = (id:number) => {
        handleDeleteNote(id)
    }

    const clearInputs = () => {
        setDate("")
        setDescription("")
        setTitle("")
    }

    const editNote = (notes:NotesList) => {
        setEditingId(notes._id)
        setEditingData({
            title: notes.title,
            description: notes.description,
            date: notes.date
        })
    }

    const saveNote = (id: number) => {
        handleUpdateNote(id,{
            ...editingData
        })
        setEditingId(null)
    }

    return(
        <div className="note-container">
            <h2> Notas </h2>

            <div className="inputs-workout">
                <input type="text" placeholder="Ingrese un titulo" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Ingrese una descripcion" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="text" placeholder="Ingrese la fecha" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div className="boton-inputs">
                <button className="add" onClick={addNote}>Agregar</button>
                <button className="clean" onClick={clearInputs}>Limpiar</button>
            </div>

            {error && <div className="error">{error}</div>}

            <div className="list-routine">
                {note.map((e,index) => (
                    <div key={index} className="note-card">
                        <button onClick={() => deleteNote(e._id)}> eliminar</button>
                        <button onClick={() => editNote(e)}>editar</button>
                        <button onClick={() => saveNote(e._id)}>guardar</button>
                        <h3>{editingId === e._id ? <input value={editingData.title} onChange={(e) => setEditingData({ ...editingData, title: e.target.value })} /> : e.title}</h3>
                        <h4>Descripción</h4>
                        <p>{editingId === e._id ? <input value={editingData.description} onChange={(e) => setEditingData({ ...editingData, title: e.target.value })} /> : e.description}</p>
                        <p>{e.date}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}