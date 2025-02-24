import axios from "axios";

const BASE_URL = "https://67acb7703f5a4e1477db9b46.mockapi.io/exercises";

export const getExercises = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los ejercicios:", error);
        return [];
    }
};