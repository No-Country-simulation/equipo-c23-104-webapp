import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const PerfilContexto = createContext();

const PerfilContextoProvider = (props) => {
    const [datosUsurio, setDatosUsurio] = useState({});

    const getDatosUsuario = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/datos/1`)
                setDatosUsurio(response.data);
        } catch (error) {
            console.error("Error", error);
        }
    };

    useEffect(() => {
        getDatosUsuario();
    }, []);

    return (
        <PerfilContexto.Provider value={{datosUsurio, getDatosUsuario}}>
            {props.children}
        </PerfilContexto.Provider>
    )
};

export default PerfilContextoProvider;