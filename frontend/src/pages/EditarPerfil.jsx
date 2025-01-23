import { Link } from "react-router-dom";
import perfilImagen from "../assets/perfil-icono.png";
import { useContext } from "react";
import { PerfilContexto } from "../context/PerfilContext";

const EditarPerfil = () => {
    const { datosUsurio } = useContext(PerfilContexto);

    const controladorEvento = (e) => {
        // e.preventDefault();
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
                <form className="flex flex-col gap-4 *:outline-none">
                    <input className="p-2 rounded-xl border border-[#A19FA1]" type="text" placeholder={datosUsurio.nombre} required />
                    <input className="p-2 rounded-xl border border-[#A19FA1]" type="text" placeholder={`@${datosUsurio.nombreUsuario}`} required />
                    {/* <input className="p-2 rounded-xl border border-[#A19FA1]" type="text" placeholder="Biografía" /> */}
                    <input className="h-8 px-3 flex items-center absolute top-4 right-4 text-white font-medium bg-[#06BF00] rounded-3xl hover:cursor-pointer" type="submit" value="Guardar" onClick={controladorEvento} />
                </form>
            </div>
        </section>
    )
};

export default EditarPerfil;