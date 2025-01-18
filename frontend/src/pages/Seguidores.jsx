import TarjetaSeguidor from "../components/TarjetaSeguidor";
import { Link } from "react-router-dom";
import "./seguidores.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Seguidores = ({url, titulo, boton}) => {
    // npx json-server db.json  

    const [seguidores, setSeguidores] = useState([]);
        
    const getSeguidores = () => {
        axios.get(`http://localhost:3000/${url}`)
            .then((response) => {
                setSeguidores(...seguidores, response.data)
            })
            .catch((error) => {
                console.error("Error:", error);
            })
    };

    useEffect(() => {
        getSeguidores();
    }, []);

    // console.log(seguidores);

    return (
        <section className="fixed top-0 w-full h-full flex items-center justify-center overflow-hidden bg-[#4a494ada] backdrop-blur-[2px]">
            <div id="contenedor" className="relative h-[95vh] min-w-64 flex flex-col gap-y-4 p-4 rounded-xl bg-white overflow-auto max-[550px]:w-full max-[550px]:h-full max-[550px]:rounded-none">
                <div className="w-full p-1 mb-[-10px] flex items-center gap-1 sticky top-[-1rem] bg-white">
                    <Link to="/" className="w-7 h-7 flex items-center justify-center text-2xl font-extralight rounded-full hover:bg-[#A19FA1]">⬅️</Link>
                    <h2>{titulo}</h2>
                </div>
                {seguidores.map((seguidor) => <TarjetaSeguidor key={seguidor.id} seguidor={seguidor} boton={boton} />)}
            </div>
        </section>
    )
};

export default Seguidores;