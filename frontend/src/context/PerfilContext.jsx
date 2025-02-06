import { useState, useEffect, createContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode"

export const PerfilContexto = createContext();

const apiDatosUsuario = import.meta.env.VITE_PERFIL_DATOS_USUARIO;

const PerfilContextoProvider = (props) => {
    const [datosUsuario, setDatosUsuario] = useState({});

    const getDatosUsuario = async () => {
        try {
            const authToken = localStorage.getItem("authToken");
            if (!authToken) throw new Error("No auth token found");
            const decodedToken = jwt_decode(authToken);
            if (!decodedToken || !decodedToken.userId) throw new Error("Invalid token structure");
            
            const userId = decodedToken.userId;
            const response = await axios.get(`${apiDatosUsuario}/${userId}`).then((res) => {
                setDatosUsuario(res.data);
            });
        } catch (error) {
            console.error("Error obteniendo datos del usuario:", error);
        }
    };

    useEffect(() => {
        getDatosUsuario();
    }, []);

    return (
        <PerfilContexto.Provider value={{ datosUsuario, getDatosUsuario, apiDatosUsuario }}>
            {props.children}
        </PerfilContexto.Provider>
    );
};

export default PerfilContextoProvider;
