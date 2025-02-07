import TarjetaSeguidor from "../components/TarjetaSeguidor";
import { Link } from "react-router-dom";
import "./seguidores.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const apiSeguidores = import.meta.env.VITE_PERFIL_SEGUIDORES;

const Seguidores = ({url, titulo, boton}) => {

    const [seguidores, setSeguidores] = useState([]);
    const contenRef = useRef(null);
        
    const getSeguidores = async () => {
        try {
            const response = await axios.get(apiSeguidores + url,{headers: { 
                'Content-Type': 'application/json', 
                'ngrok-skip-browser-warning': 'true' 
              }})
                setSeguidores(...seguidores, response.data),
                response.data.length !== 0 ? contenRef.current.classList.add("hidden") : ""
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        getSeguidores();
    }, []);

    return (
        <section className="fixed top-0 w-full h-full flex items-center justify-center overflow-hidden bg-[#4a494ada] backdrop-blur-[2px] *:text-[#4A494A] z-50">
            <div id="contenedor" className="relative max-h-[95vh] min-w-64 flex flex-col gap-y-4 p-4 rounded-xl bg-white overflow-auto max-[550px]:w-full max-[550px]:max-h-full max-[550px]:rounded-none">
                <div className="w-full p-1 mb-[-10px] flex items-center gap-1 sticky top-[-1.1rem] bg-white">
                    <Link to="/perfil" className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[rgb(161,159,161)]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                        </svg>
                    </Link>
                    <h2>{titulo}</h2>
                </div>
                <div ref={contenRef} className="h-20 flex items-center justify-center font-semibold">
                    {url === "siguiendo" ? "¡No estas siguiendo a nadie aún!" : "¡Nadie te sigue aún!"}
                </div>
                {seguidores.map((seguidor) => <TarjetaSeguidor key={seguidor.id} seguidor={seguidor} boton={boton} />)}
            </div>
        </section>
    )
};

export default Seguidores;