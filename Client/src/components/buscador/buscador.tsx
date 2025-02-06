import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import "./buscador.css"
import React, { useEffect, useState } from 'react';
import listaAlimentos from "./data.json"

interface Alimentos {
    id: number;
    name: string;
    kcal: number;
    protein: number;
}

export function BuscadorAlimentos() {
    const [inputValue, setInputValue] = useState("")
    const [alimentos, setAlimentos] = useState<Alimentos[]>([])
    const [error, setError] = useState<string | null>(null);

    const fetchAlimentos = async () => {
        try {
            const data: Alimentos[] = listaAlimentos;
            setAlimentos(data)
        } catch (err: any) {
            setError(err.message)
        }
    }

    useEffect(() => {
        fetchAlimentos()
    }, [])

    if (error) return <div>{error}</div>;

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        const palabras = value.trim().toLowerCase().split(/\s+/);
        busquedaAlimentos(palabras);
    }

    const busquedaAlimentos = (palabras: string[]) => {
        setAlimentos(listaAlimentos.filter(alimento => {
            return palabras.every(palabra =>
                alimento.name.toLowerCase().includes(palabra)
            )
        }))
    }

    const cleanInput = () => {
        setInputValue("");
        setAlimentos(listaAlimentos);
    }

    return (
        <div className="buscador-container">
            <input type="text"
                placeholder="¿Que alimento buscas?"
                className="buscador-input"
                value={inputValue}
                onChange={handleInput}
            />



            {inputValue && (
                <div className="search-icon">
                    <SearchIcon/>
                </div>
            )}

            {inputValue && (
                <div className="cancel-icon" onClick={cleanInput}>
                    <ClearIcon />
                </div>
            )}
            
            <div className='alimentos-container'>
                {alimentos.map((alimento) => (
                    <li key={alimento.id}>
                        <p>{alimento.name}</p>
                        <p>{alimento.kcal}</p>
                        <p>{alimento.protein} grs</p>
                    </li>
                ))}
            </div>
        </div>
    )
}