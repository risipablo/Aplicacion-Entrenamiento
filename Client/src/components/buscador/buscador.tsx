import { useState } from 'react'
import './buscador.css'
import SearchIcon from '@mui/icons-material/Search';
import { foodNutrition } from '../data/dataFood'
import { ClipLoader } from 'react-spinners';
import axios from 'axios';


export function BuscadorAlimentos() {
    const [nutrition, setNutrition] = useState<any>(null)
    const [food, setFood] = useState("")
    const [loading,setLoading] = useState(false)
    const [translated, setTranslated] = useState<string[]>([])

 
    const GOOGLE_API_KEY = 'AIzaSyA62p51Ev60un5dbdKHuxxT2iGm71RgHLE'

    const translateText = async (text:string, targetLanguage:string = 'es-LA') => {
        try{
            const response = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`,{
                q: text,
                target: targetLanguage,
            })
            return response.data.data.translations[0].translatedText
        } catch (error) {
            console.error("Error traduciendo texto:", error);
            return text
        }
    }

    const fetchAlimentos = async () => {
        if (!food.trim()) return // no devuelve nada si no hay ningun alimento buscado
        setLoading(true)
        setNutrition(null)
        setTranslated([])

        try {
            const data = await foodNutrition(food)
            if (data.foods && data.foods.length > 0) {
                setNutrition(data)

                const translations = await Promise.all(
                    data.foods.map(async (item:any) => {
                        return await translateText(item.food_name)
                    })
                )
                setTranslated(translations)
            } else {
                setNutrition(null)
            }
        } catch (error) {
            console.error("Error al obtener información de los alimentos")
            setNutrition(null)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="buscador-container">
            <div className="buscador-input-container">
                <input 
                    type="text"
                    placeholder='¿Qué alimento buscas?'
                    className='buscador-input'
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                />
                <button className="buscador-button" onClick={fetchAlimentos}>
                    <SearchIcon/>
                </button>
            </div>

            {loading && <ClipLoader size={35} color="#ffcc00" className="loader"/>}

            {nutrition && nutrition.foods.length > 0 && (
                <div className="alimentos-container">
                    {nutrition.foods.map((item:any , index:number) => (
                        <div className="alimento-key" key={index}>
                            <p>
                                <strong>Nombre:</strong> {translated[index]} (en inglés: {item.food_name})
                            </p>
                            
                            <p><strong>Nombre:</strong> {item.food_name}</p>
                            <p><strong>Calorías:</strong> {item.nf_calories} kcal</p>
                            <p><strong>Proteínas:</strong> {item.nf_protein} g</p>
                            <p><strong>Carbohidratos:</strong> {item.nf_total_carbohydrate} g</p>
                            <p><strong>Grasas:</strong> {item.nf_total_fat} g</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}