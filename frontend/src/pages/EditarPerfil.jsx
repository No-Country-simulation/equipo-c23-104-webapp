import { Link, useNavigate } from "react-router-dom";
import perfilImagen from "../assets/perfil-icono.png";
import { useState, useContext } from "react";
import { PerfilContexto } from "../context/PerfilContext";
import axios from "axios";

const EditarPerfil = () => {
    const { datosUsurio, getDatosUsuario } = useContext(PerfilContexto);
    const [ nombre, setNombre ] = useState("");
    const [ nombreUsuario, setNombreUsuario ] = useState("");
    const navigate = useNavigate();

    const controladorEvento = (e) => {
        e.preventDefault();

        const datos = {
            nombre,
            nombreUsuario
        };

        axios.patch('http://localhost:3000/datos/1', datos)
            .then(response => {
                console.log('Usuario actualizado:', response.data);
                getDatosUsuario();
                navigate(-1);
            })
            .catch(error => {
                console.error('Error al actualizar usuario:', error);
                window.alert("Hubo un error, vuelva a intentarlo");
            });
    };

    return (
        <section className="fixed top-0 w-full h-full flex items-center justify-center overflow-hidden bg-[#4a494ada] backdrop-blur-[2px]">
            <div className="w-96 p-4 relative flex flex-col justify-center rounded-xl bg-white max-[450px]:w-full max-[450px]:h-full max-[450px]:rounded-none">
                <div className="flex items-center justify-between max-[450px]:absolute max-[450px]:top-4 max-[450px]:w-[calc(100%-2rem)]">
                    <div className="flex items-center gap-1">
                        <Link to="/" className="w-7 h-7 flex items-center justify-center text-2xl font-extralight rounded-full hover:bg-[#A19FA1]">⬅️</Link>
                        <h2>Editar Perfil</h2>
                    </div>
                    {/* <Link to="/" className="h-8 px-3 flex items-center text-white font-medium bg-[#06BF00] rounded-3xl">Guardar</Link> */}
                </div>
                <div className="w-32 h-32 my-4 mx-auto bg-[#4A494A] border-2 border-[#A19FA1] rounded-full overflow-hidden">
                    <img src={datosUsurio.img || perfilImagen} alt="perfil-icono" />
                </div>
                <form onSubmit={controladorEvento} className="flex flex-col gap-4 *:outline-none">
                    <input className="p-2 rounded-xl border border-[#A19FA1]" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder={datosUsurio.nombre} required />
                    <input className="p-2 rounded-xl border border-[#A19FA1]" type="text" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} placeholder={`@${datosUsurio.nombreUsuario}`} required />
                    {/* <input className="p-2 rounded-xl border border-[#A19FA1]" type="text" placeholder="Biografía" /> */}
                    <input className="h-8 px-3 flex items-center absolute top-4 right-4 text-white font-medium bg-[#06BF00] rounded-3xl hover:cursor-pointer" type="submit" value="Guardar" />
                </form>
            </div>
        </section>
    )
};

export default EditarPerfil;