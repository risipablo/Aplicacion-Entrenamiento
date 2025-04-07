import "./baner.css"

import baner1 from "../../assets/images/Natacion.png";
import baner2 from "../../assets/images/GYM.png";
import baner3 from "../../assets/images/BICILETA.png";
import { NavLink } from "react-router-dom";

export default function Baner() {
    const baners = [
        {
            id: 1,
            title: "Natacion",
            image: baner1,
            link: "/natacion"
        },
        {
            id: 2,
            title: "Gym",
            image: baner2,
            link: "/gym"
        },
        {
            id: 3,
            title: "Bicicleta",
            image: baner3,
            link: "/bicicleta"
        }
    ]

    return (
        <div className="container-baners">
            <div className="list-baners">
                {baners.map(baner => 
                    <NavLink to={baner.link} key={baner.id}>
                        <img src={baner.image} alt={baner.title} className="baner" />
                    </NavLink>
                )}
            </div>
        </div>
    );
}