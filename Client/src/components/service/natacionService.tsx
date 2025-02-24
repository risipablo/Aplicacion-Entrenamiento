import axios from "axios"


// const serverFront = 'http://localhost:3001'
const serverFront = 'https://aplicacion-entrenamiento.onrender.com'


export const getNatacion = async () => {
    try {
        const response = await axios.get(`${serverFront}/api/swin`);
        return response.data
    } catch (error) {
        throw new Error('Error al obtener los datos')
    }
}

export const addSwin = async (data: {
    day: string,
    title: string,
    routine: string[],
    piletas: number,
    meters: number
}) => {
    try {
        const response = await axios.post(`${serverFront}/api/add-swin`, data)
        return response.data;
    } catch (error) {
        throw new Error('Error al agregar un nuevo registro')
    }
}

export const deleteSwin = async (id: number) => {
    try {
        await axios.delete(`${serverFront}/api/swin/${id}`)
    } catch (error) {
        throw new Error('Error al eliminar el registro')
    }
}

export const updateSwin = async (id: number, data: Partial<{ day: string, title: string, routine: string[], piletas: number, meters: number }>) => {
    try {
        const response = await axios.patch(`${serverFront}/api/swin/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error('Error al actualizar el registro');
    }
};

export const addRoutine = async (id: number, newRoutine: string) => {
    try {
        const response = await axios.put(`${serverFront}/api/swin/${id}/add-routine`, { newRoutine })
        return response.data
    } catch (error) {
        throw new Error('Error al agregar una nueva rutina')
    }
}