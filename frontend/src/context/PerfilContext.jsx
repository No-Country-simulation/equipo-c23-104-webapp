import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const PerfilContexto = createContext();

const PerfilContextoProvider = (props) => {
    const [datosUsurio, setDatosUsurio] = useState({});

    const getDatosUsuario = () => {
        axios.get(`http://localhost:3000/datos`)
            .then(response => {
                setDatosUsurio(response.data);
            })
            .catch(error => {
                console.error("Error", error);
            });
    };

    useEffect(() => {
        getDatosUsuario();
    }, []);

    return (
        <PerfilContexto.Provider value={{datosUsurio}}>
            {props.children}
        </PerfilContexto.Provider>
    )
};

export default PerfilContextoProvider;