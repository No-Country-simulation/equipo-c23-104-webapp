import PostsPerfil from "../components/PostsPerfil";
import perfilImagen from "../assets/perfil-icono.png";
import { Outlet, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PerfilContexto } from "../context/PerfilContext";
import { use } from "react";

const apiPosts = import.meta.env.VITE_PERFIL_POSTS_USUARIO;

const Perfil = () => {
    const [postLista, setPostLista] = useState([]);
    const {datosUsuario, authToken} = useContext(PerfilContexto);
    const [actualizar, setActualizar] = useState(datosUsuario);

    const getPost = async () => {
        try {
            console.log(datosUsuario.username);
            const response = await axios.get(`${apiPosts}/${datosUsuario.username}`,{
                headers: { Authorization: `Bearer ${authToken}` }
            }).then((res)=>{
                setPostLista(res.data);
                console.log(res.data);
            })
        } catch (error) {
            console.error("Error", error);
        }
    };

    useEffect(() => {
        getPost();
    }, [datosUsuario]);


    return (
        <>
            <section className="overflow-x-hidden">
                <div className="w-7/12 min-w-[30rem] m-auto border max-[550px]:w-full max-[550px]:min-w-80">
                    <div className="w-full h-40 bg-[#A19FA1]" />
                    <div className="flex justify-between p-4">
                        <div className="w-32 h-32 flex items-center justify-center bg-[#4A494A] border-2 rounded-full mt-[-80px] overflow-hidden">
                            <img className="w-full h-full object-cover" src={datosUsuario.urlProfile || perfilImagen} alt="perfil-icono" />
                        </div>
                        <Link to="editar" className="h-8 px-4 flex items-center text-white font-medium bg-lime-600 rounded-xl">Editar perfil</Link>
                    </div>
                    <div className="px-6 *:text-[#4A494A]">
                        <h2 className="text-2xl font-semibold">{datosUsuario.name}</h2>
                        <p>@{datosUsuario.username}</p>
                        <div className="flex gap-x-3">
                            <Link to="siguiendo" className="hover:underline decoration-[#4A494A]"><span className="font-semibold">10</span> siguiendo</Link>
                            <Link to="seguidores" className="hover:underline decoration-[#4A494A]"><span className="font-semibold">20</span> seguidores</Link>
                        </div>
                    </div>
                    <nav className="mt-2 flex border-b border *:text-[#4A494A]">
                        <button className="text-center w-full rounded-none p-4 hover:bg-[#A19FA1] hover:border-none" onClick={() => getPost("posts")}>Post</button>
                        <button className="text-center w-full rounded-none p-4 hover:bg-[#A19FA1] hover:border-none" onClick={() => getPost("comments")}>Me gusta</button>
                    </nav>
                    <PostsPerfil postLista={postLista.content} />
                </div>
            </section>
            <Outlet />
        </>
    )
};

export default Perfil;