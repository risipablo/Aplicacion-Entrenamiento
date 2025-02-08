import axios from "axios";


const APP_ID='aee2c5bb'
const APP_KEY='31b614eb571279f0ea6de878dced8ee8'
const BASE_URL = "https://trackapi.nutritionix.com/v2/natural/nutrients";

export const foodNutrition = async (food:string) => {
    try{
        const response = await axios.post(
            BASE_URL,
            {query:food},
            {
                headers: {
                  "Content-Type": "application/json",
                  "x-app-id": APP_ID,
                  "x-app-key": APP_KEY,
                },
              }
        )
        return response.data
    } catch (error) {
        console.error("Error al obtener la información nutricional:", error);
        return null;
    }
}