import { useEffect, useState } from "react"
import { RoutineList } from "../interface/interfaces"
import {  addGym, deleteGym, getGym } from "../service/gymService"


export const useGym = () => {
    const [gym, setGym] = useState<RoutineList[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchGym = async () => {
            try {
                const data = await getGym()
                setGym(data)
            } catch (error: any) {
                setError(error.message)
            }
        }
        fetchGym()
    },[])

    const handleAddGym = async (data: {
        title: string,
        muscle: string,
        series: string,
        reps: string
    }) => {
        try {
            const newGym = await addGym(data)
            setGym([...gym,newGym])
        } catch (error:any) {
            setError(error.message)
        }
    }

    const handleDeleteGym = async (id:number) => {
        try{
            await deleteGym(id)
            setGym(gym.filter(index => index._id !== id))
        } catch(error:any){
            setError(error.message)
        }
    }

    return {
        gym,
        error,
        handleAddGym,
        handleDeleteGym
    }
}