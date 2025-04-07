import { useEffect, useState } from "react"
import { NotesList } from "../interface/interfaces"
import { addNotes, deleteNotes, getNotes, updateNote } from "../service/notesService"


export const useNote = () => {
    const [note,setNote] = useState<NotesList[]>([])
    const [error,setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchNote = async () => {
            try{
                const data = await getNotes()
                setNote(data)
            } catch (error: any){
                setError(error.message)
            }
        }
        fetchNote()
    },[])

    const handleAddNote = async (data: {
        title:string,
        description:string,
        date:string
    }) => {
        try{
            const newNote = await addNotes(data)
            setNote([...note, newNote])
        } catch (error: any) {
            setError(error.message)
        }
    }

    const handleDeleteNote = async (id: number) => {
        try{
            await deleteNotes(id)
            setNote(note.filter(not => not._id !== id))
        } catch (error:any){
            setError(error.message)
        }
    }

    const handleUpdateNote = async (id: number,data: Partial<NotesList>) => {
        try {
            const updatedNote = await updateNote(id,data)
            setNote(note.map(not => not._id === id ? updatedNote : not))
        }catch (error: any){
            setError(error.message)
        }
    } 


    return{
        note,
        error,
        handleAddNote,
        handleDeleteNote,
        handleUpdateNote
    }

}