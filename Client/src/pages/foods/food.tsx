
import { useState } from 'react'
import './food.css'
import { foodNutrition } from '../../components/data/dataFood'


export function Food(){
    const [food,setFood] = useState("")
    const [nutrition, setNutrition] = useState<any>(null)

    const handleSearch = async() => {
        if (!food) return;
        const data = await foodNutrition(food)
        setNutrition(data)
    }


    return(
        <div className="food-container">
            <h2>Lista de Alimentos</h2>
            <input
        type="text"
        value={food}
        onChange={(e) => setFood(e.target.value)}
        placeholder="Ejemplo: 100g pollo"
      />
      <button onClick={handleSearch}>Buscar</button>

      {nutrition && (
        <div>
          <h3>Resultados para: {food}</h3>
          {nutrition.foods.map((item: any, index: number) => (
            <div key={index}>
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