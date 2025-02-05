import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const PerfilContexto = createContext();

const apiDatosUsuario = import.meta.env.VITE_PERFIL_DATOS_USUARIO;

const PerfilContextoProvider = (props) => {
    const [datosUsurio, setDatosUsurio] = useState({});

    const getDatosUsuario = async () => {
        try {
            const response = await axios.get(apiDatosUsuario)
                setDatosUsurio(response.data);
        } catch (error) {
            console.error("Error", error);
        }
    };

    useEffect(() => {
        getDatosUsuario();
    }, []);

    return (
        <PerfilContexto.Provider value={{datosUsurio, getDatosUsuario, apiDatosUsuario}}>
            {props.children}
        </PerfilContexto.Provider>
    )
};

export default PerfilContextoProvider;