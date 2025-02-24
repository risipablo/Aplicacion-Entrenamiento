import axios from "axios"

const serverFront = 'http://localhost:3001'
// const serverFront = 'https://aplicacion-entrenamiento.onrender.com'

export const getNotes = async () => {
    try{
        const response = await axios.get(`${serverFront}/api/notes`)
        return response.data
    } catch (error){
        throw new Error('Error al obtener los datos')
    }
}

export const addNotes = async (data:{
    title:string,
    description:string,
    date:string
}) => {
    try{
        const response = await axios.post(`${serverFront}/api/notes`, data)
        return response.data;
    } catch (error){
        throw new Error ("Error al agregar la nota")
    }
}

export const deleteNotes = async (id:number) => {
    try{
        await axios.delete(`${serverFront}/api/notes/${id}`)
    } catch (error) {
        throw new Error("Error al eliminar la nota")
    }
}


export const updateNote = async (id:number, data: Partial<{title:string, description: string, date:string}>) => {
    try {
        const response = await axios.patch(`${serverFront}/api/notes/${id}`,data)
        return response.data
    } catch (error){
        throw new Error('Error al actualizar el registro')
    }
}