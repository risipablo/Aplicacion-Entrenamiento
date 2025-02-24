import Baner from "../../components/baners/baner"
import { BuscadorAlimentos } from "../../components/buscador/buscador"
import "./home.css"


export default function Home(){
    return(
        <div className="container-home">
            {/* <h2> Actividades</h2> */}
            <Baner/>
            <BuscadorAlimentos />
        </div>
    )
}