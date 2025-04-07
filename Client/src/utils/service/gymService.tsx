import axios from "axios"



const serverFront = 'http://localhost:3001'
// const serverFront = 'https://aplicacion-entrenamiento.onrender.com'

export const getGym = async () => {
    try{
        const response = await axios.get(`${serverFront}/api/gym`)
        return response.data
    } catch (error) {
        throw new Error('Error al obtener los datos')
    } 
}

export const addGym = async (data:{
    title:string,
    muscle:string,
    series:string,
    reps:string
    
}) => {
    try{
        const response = await axios.post(`${serverFront}/api/gym`, data)
        return response.data
    } catch (error) {
        throw new Error('Error al agregar el ejercicio')
    }
}

export const deleteGym = async (id:number) => {
    try{
        await axios.delete(`${serverFront}/api/gym/${id}`)
    } catch (error) {
        throw new Error('Error al eliminar el ejercicio')
    }
}

export const updateGym = async (id:number, data: Partial<{title:string, muscle:string[], series:number[], reps:number[]}>) => {
    try{
        const response = await axios.patch(`${serverFront}/api/gym/${id}`, data)
        return response.data
    } catch (error) {
        throw new Error('Error al actualizar el ejercicio')
    }
}

