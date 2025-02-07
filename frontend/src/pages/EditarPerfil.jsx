import { Link, useNavigate } from "react-router-dom";
import perfilImagen from "../assets/perfil-icono.png";
import { useState, useContext, useRef } from "react";
import { PerfilContexto } from "../context/PerfilContext";
import axios from "axios";
import camaraIcono from "../assets/camara.png";

const VITE_IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
const apiEditPerfil = import.meta.env.VITE_PERFIL_EDIT_USUARIO;

const EditarPerfil = (props) => {
    const { datosUsuario, getDatosUsuario, authToken } = useContext(PerfilContexto);
    const [ nombre, setNombre ] = useState("");
    const [ nombreUsuario, setNombreUsuario ] = useState("");
    const [ img, setImg ] = useState(null);
    const navigate = useNavigate();
    const imgRef = useRef(null);

    const controladorEvento = async (e) => {
        e.preventDefault();

        const datos = {
            nameEdit: nombre,
            urlProfileEdit: img
        };
        
        try {
            const response = await axios.patch(apiEditPerfil, datos, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            })
                console.log('Usuario actualizado:', response.data);
                getDatosUsuario();
                navigate(-1);
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            window.alert("Hubo un error, vuelva a intentarlo");
        }
    };

    const handleImageChange = async (e) => {
        const imagenFile = e.target.files[0];
    
        const formData = new FormData();
        formData.append('image', imagenFile);

        try {
            const response = await axios.post(`https://api.imgbb.com/1/upload?&key=${VITE_IMGBB_API_KEY}`, formData)
                setImg(response.data.data.url);
                imgRef.current.src = response.data.data.url;
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            alert('Hubo un error al subir la imagen.');
        }
    };

    return (
        <section className="fixed top-0 w-full h-full flex items-center justify-center overflow-hidden bg-[#4a494ada] backdrop-blur-[2px] *:text-[#4A494A] z-50">
            <div className="w-96 p-4 relative flex flex-col justify-center rounded-xl bg-white max-[450px]:w-full max-[450px]:h-full max-[450px]:rounded-none">
                <div className="flex items-center justify-between max-[450px]:absolute max-[450px]:top-4 max-[450px]:w-[calc(100%-2rem)]">
                    <div className="flex items-center gap-1">
                        <Link to="/perfil" className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#A19FA1]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                            </svg>
                        </Link>
                        <h2>Editar Perfil</h2>
                    </div>
                    {/* <Link to="/" className="h-8 px-3 flex items-center text-white font-medium bg-[#06BF00] rounded-3xl">Guardar</Link> */}
                </div>
                <div className="w-32 h-32 my-4 mx-auto flex items-center justify-center bg-[#4A494A] border-2 border-[#A19FA1] rounded-full overflow-hidden">
                    <label htmlFor="subir-imagen" className="w-full h-full relative flex  items-center justify-center hover:cursor-pointer *:hover:block">
                        <img className="absolute w-10 hidden" src={camaraIcono} alt="camara-icono" />
                        <img className="w-full h-full object-cover hover:opacity-30" ref={imgRef} src={datosUsuario.img || perfilImagen} alt="perfil-icono" />
                    </label>
                </div>
                <form onSubmit={controladorEvento} className="flex flex-col gap-4 *:outline-none">
                    <input className="p-2 rounded-xl border border-[#A19FA1] bg-transparent text-[#4A494A]" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder={"Nombre"} required />
                    {/* <input className="p-2 rounded-xl border border-[#A19FA1]" type="text" placeholder="Biografía" /> */}
                    <input id="subir-imagen" className="hidden" type="file" accept=".jpg,.jpeg,.png" onChange={handleImageChange} />
                    <input className="h-8 px-3 flex items-center absolute top-4 right-4 text-white font-medium bg-lime-600 rounded-3xl hover:cursor-pointer" type="submit" value="Guardar" />
                </form>
            </div>
        </section>
    )
};

export default EditarPerfil;