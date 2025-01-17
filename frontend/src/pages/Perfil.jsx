import Post from "../components/Post";
import perfilImagen from "../assets/perfil-icono.png";
import { Outlet, Link } from "react-router-dom";

const Perfil = () => {
    return (
        <>
            <section>
                <div className="w-7/12 min-w-96 m-auto border border-[#A19FA1]">
                    <div className="w-full h-40 bg-[#A19FA1]" />
                    <div className="flex justify-between p-4">
                        <div className="w-32 h-32 bg-[#4A494A] border-2 border-[#A19FA1] rounded-full mt-[-80px]">
                            <img src={perfilImagen} alt="perfil-icono" />
                        </div>
                        <Link to="/editar-perfil" className="h-8 px-4 flex items-center text-white font-medium bg-[#06BF00] rounded-3xl">Editar perfil</Link>
                    </div>
                    <div className="px-6">
                        <h2 className="text-2xl font-semibold">Anderson Forero</h2>
                        <p>@And_f12</p>
                        <div className="flex gap-x-2">
                            <p><span className="font-semibold">10</span> Siguiendo</p>
                            <p><span className="font-semibold">20</span> Seguidores</p>
                        </div>
                    </div>
                    <nav className="mt-2 flex border-b border-[#A19FA1]">
                        <Link to="/post" className="text-center w-full p-4 hover:bg-[#A19FA1]">Post</Link>
                        <Link to="/me-gusta" className="text-center w-full p-4 hover:bg-[#A19FA1]">Me gusta</Link>
                    </nav>
                    <Post />
                </div>
            </section>
            <Outlet />
        </>
    )
};

export default Perfil;