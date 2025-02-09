import { useEffect, useState } from "react"
import { addRoutine, addSwin, deleteSwin, getNatacion, updateSwin } from '../service/natacionService';
import { NatacionList } from "../interface/interfaceSwin";




export const useNatacion = () => {
    const [natacion, setNatacion] = useState<NatacionList[]>([])
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNatacion = async () => {
            try {
                const data = await getNatacion()
                setNatacion(data)
            } catch (error: any) {
                setError(error.message)
            }
        }
        fetchNatacion()
    }, [])

    const handleAddSwin = async (data: {
        day: string,
        title: string,
        routine: string[],
        piletas: number,
        meters: number
    }) => {
        try {
            const newSwin = await addSwin(data)
            setNatacion([...natacion, newSwin])
        } catch (error: any) {
            setError(error.message)
        }
    }

    const handleDeleteSwin = async (id: number) => {
        try {
            await deleteSwin(id)
            setNatacion(natacion.filter(swin => swin._id !== id))
        } catch (error: any) {
            setError(error.message)
        }
    }

    const handleUpdateSwin = async (id: number, data: Partial<NatacionList>) => {
        try {
            const updatedSwin = await updateSwin(id, data)
            setNatacion(natacion.map(swin => swin._id === id ? updatedSwin : swin))
        } catch (error: any) {
            setError(error.message)
        }
    }

    const handleAddRoutine = async (id: number, newRoutine: string) => {
        try {
            const updatedSwin = await addRoutine(id, newRoutine)
            setNatacion(natacion.map(swin => swin._id === id ? updatedSwin : swin))
        } catch (error: any) {
            setError(error.message)
        }
    }

    return {
        natacion,
        error,
        handleAddSwin,
        handleDeleteSwin,
        handleUpdateSwin,
        handleAddRoutine,
    }
}