
import "./baner.css"

import baner1 from "../../assets/images/Natacion.png";
import baner2 from "../../assets/images/GYM.png";
import baner3 from "../../assets/images/BICILETA.png";


export default function Baner(){

    const baners=[
        {id:1, image:baner1,title:'Natacion'},
        {id:2, image:baner2,title:'Gimnasio'},
        {id:3, image:baner3,title:'Bicicleta'},
    ]


    return(
        <div className="container-baners">
            <div className="list-baners">
                {baners.map(baner => 
                    <img key={baner.id} src={baner.image} alt={baner.title} className="baner" />
                )}
            </div>
        </div>
    )
}