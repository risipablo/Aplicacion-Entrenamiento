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
    piletas: string[],
    meters: string[],
    routine: string[],

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

export const updateSwin = async (id: number, data: Partial<{ day: string, title: string, routine: string[], piletas: string[], meters: string[] }>) => {
    try {
        const response = await axios.patch(`${serverFront}/api/swin/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error('Error al actualizar el registro');
    }
};

export const addRoutine = async (id: number, newPiletas: string, newMeters: string, newRoutine: string,) => {
    try {
        const data = { newPiletas, newMeters, newRoutine };
        console.log('Sending data:', data);
        const response = await axios.put(`${serverFront}/api/swin/${id}/add-routine`, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error response:', error.response.data);
        }
        throw new Error('Error al agregar una nueva rutina');
    }
};

export const deleteRoutine = async (id:number, routineIndex:number) => {
    try{
        const response = await axios.delete(`${serverFront}/api/swin/${id}/delete-routine/${routineIndex}`)
        return response.data
    } catch (error) {
        throw new Error('Error al agregar una nueva rutina');
    }
}