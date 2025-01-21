import { Link } from "react-router-dom";
import perfilImagen from "../assets/perfil-icono.png";

const EditarPerfil = () => {
    return (
        <section className="fixed top-0 w-full h-full flex items-center justify-center overflow-hidden bg-[#4a494ada] backdrop-blur-[2px]">
            <div className="w-2/5 min-w-64 p-4 rounded-xl bg-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <Link to="/" className="w-7 h-7 flex items-center justify-center text-2xl font-extralight rounded-full hover:bg-[#A19FA1]">⬅️</Link>
                        <h2>Editar Perfil</h2>
                    </div>
                    <Link to="/" className="h-8 px-3 flex items-center text-white font-medium bg-[#06BF00] rounded-3xl">Guardar</Link>
                </div>
                <div className="w-32 h-32 my-4 mx-auto bg-[#4A494A] border-2 border-[#A19FA1] rounded-full">
                    <img src={perfilImagen} alt="perfil-icono" />
                </div>
                <form className="flex flex-col gap-4">
                    <input className="p-2 rounded-xl border border-[#A19FA1]" type="text" placeholder="Nombre completo" />
                    <input className="p-2 rounded-xl border border-[#A19FA1]" type="text" placeholder="@Nombre_de_usuario" />
                    <input className="p-2 rounded-xl border border-[#A19FA1]" type="text" placeholder="Biografía" />
                </form>
            </div>
        </section>
    )
};

export default EditarPerfil;