import perfilImagen from "../assets/perfil-icono.png";
import axios from "axios";

const TarjetaSeguidor = ({seguidor, boton}) => {
    const eliminarSeguidor = (id) => {
        axios.delete(`http://localhost:3000/siguiendo/${seguidor.id}`)
            .then((response) => {
                console.log(response)
                const boton = document.getElementById(seguidor.id);
                boton.classList.remove("bg-[#06BF00]");
                boton.classList.add("text-[#A19FA1]", "border", "border-[#A19FA1]");
                boton.textContent = "Dejado de seguir";
            })
            .catch((error) => {
                console.error("Error", error);
            })
        console.log(seguidor.id);
    }

    return (
        <div className="grid grid-cols-[_min-content,_1fr,_min-content] gap-x-2 items-center">
            <div className="w-16 h-16 flex items-center  overflow-hidden">
                <img src={seguidor.img || perfilImagen} alt="foto-de-perfil" />
            </div>
            <div className="px-4">
                <h3>{seguidor.nombre}</h3>
                <p>@{seguidor.nombreUsuario}</p>
            </div>
            {boton ? <button id={seguidor.id} className="h-8 px-2 flex items-center justify-center text-white whitespace-nowrap font-medium bg-[#06BF00] rounded-3xl max-[550px]:text-xs" onClick={eliminarSeguidor}>Dejar de seguir</button> : ""}
        </div>
    )
};

export default TarjetaSeguidor;