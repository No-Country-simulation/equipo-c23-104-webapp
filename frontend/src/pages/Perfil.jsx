import PostsPerfil from "../components/PostsPerfil";
import perfilImagen from "../assets/perfil-icono.png";
import { Outlet, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PerfilContexto } from "../context/PerfilContext";

const apiPosts = import.meta.env.VITE_PERFIL_POSTS;
// npx json-server db.json

const Perfil = () => {
    const [postLista, setPostLista] = useState([]);
    const { datosUsurio } = useContext(PerfilContexto);

    const getPost = async (url) => {
        try {
            const response = await axios.get(apiPosts)
                setPostLista(response.data);
                console.log("->",response.data);
        } catch (error) {
            console.error("Error", error);
        }
    };

    useEffect(() => {
        getPost("posts");
    }, []);

    // console.log(datosUsurio);

    return (
        <>
            <section className="overflow-x-hidden">
                <div className="w-7/12 min-w-[30rem] m-auto border max-[550px]:w-full max-[550px]:min-w-80">
                    <div className="w-full h-40 bg-[#A19FA1]" />
                    <div className="flex justify-between p-4">
                        <div className="w-32 h-32 flex items-center justify-center bg-[#4A494A] border-2 rounded-full mt-[-80px] overflow-hidden">
                            <img className="w-full h-full object-cover" src={datosUsurio.img || perfilImagen} alt="perfil-icono" />
                        </div>
                        <Link to="editar" className="h-8 px-4 flex items-center text-white font-medium bg-lime-600 rounded-xl">Editar perfil</Link>
                    </div>
                    <div className="px-6 *:text-[#4A494A]">
                        <h2 className="text-2xl font-semibold">{datosUsurio.nombre}</h2>
                        <p>@{datosUsurio.nombreUsuario}</p>
                        <div className="flex gap-x-3">
                            {/* <p><span className="font-semibold">10</span> Siguiendo</p>
                            <p><span className="font-semibold">20</span> Seguidores</p> */}
                            <Link to="siguiendo" className="hover:underline decoration-[#4A494A]"><span className="font-semibold">10</span> siguiendo</Link>
                            <Link to="seguidores" className="hover:underline decoration-[#4A494A]"><span className="font-semibold">20</span> seguidores</Link>
                        </div>
                    </div>
                    <nav className="mt-2 flex border-b border *:text-[#4A494A]">
                        {/* <Link to="/post" className="text-center w-full p-4 hover:bg-[#A19FA1]">Post</Link>
                        <Link to="/me-gusta" className="text-center w-full p-4 hover:bg-[#A19FA1]">Me gusta</Link> */}
                        <button className="text-center w-full rounded-none p-4 hover:bg-[#A19FA1] hover:border-none" onClick={() => getPost("posts")}>Post</button>
                        <button className="text-center w-full rounded-none p-4 hover:bg-[#A19FA1] hover:border-none" onClick={() => getPost("comments")}>Me gusta</button>
                    </nav>
                    <PostsPerfil postLista={postLista} />
                </div>
            </section>
            <Outlet />
        </>
    )
};

export default Perfil;