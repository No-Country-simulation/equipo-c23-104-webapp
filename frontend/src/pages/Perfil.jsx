import PostsPerfil from "../components/PostsPerfil";
import perfilImagen from "../assets/perfil-icono.png";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PerfilContexto } from "../context/PerfilContext";

const apiPosts = import.meta.env.VITE_PERFIL_POSTS_USUARIO;
const apiPostsLiked = import.meta.env.VITE_PERFIL_LIKED_USUARIO;
const apiDatosUsuario = import.meta.env.VITE_PERFIL_DATOS_USUARIO_USERNAME;

const Perfil = (props) => {
    const location = useLocation();
    const username = location.state?.username;
    const { datosUsuario, authToken } = useContext(PerfilContexto);
    const [perfilData, setPerfilData] = useState(datosUsuario);
    const [postLista, setPostLista] = useState([]);

    // Si hay un username en location.state, obtenemos los datos del usuario
    const getDatosUsuario = async () => {
        if (username) {
            try {
                const response = await axios.get(`${apiDatosUsuario}/${username}`, {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                setPerfilData(response.data);
            } catch (error) {
                console.error("Error al obtener datos del usuario:", error);
            }
        }
    };

    const getPost = async () => {
        try {
            const response = await axios.get(`${apiPosts}/${username ? username : perfilData.username}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            setPostLista(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error al obtener posts:", error);
        }
    };

    const getPostLiked = async () => {
        try {
            const response = await axios.get(`${apiPostsLiked}/${perfilData.username}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            setPostLista(response.data);
            console.log("liked->", response.data);
        } catch (error) {
            console.error("Error al obtener posts liked:", error);
        }
    };

    useEffect(() => {
        if (username) {
            getDatosUsuario();
        }
    }, [username]);

    useEffect(() => {
        getPost();
    }, [perfilData]);


    return (
        <>
            <section className="overflow-x-hidden">
                <div className="w-7/12 min-w-[30rem] m-auto border max-[550px]:w-full max-[550px]:min-w-80">
                    <div className="w-full h-40 bg-[#A19FA1]" />
                    <div className="flex justify-between p-4">
                        <div className="w-32 h-32 flex items-center justify-center bg-[#4A494A] border-2 rounded-full mt-[-80px] overflow-hidden">
                            <img className="w-full h-full object-cover" src={perfilData.urlProfile || perfilImagen} alt="perfil-icono" />
                        </div>
                        {
                            location.state ? 
                            null:
                            <Link to="editar" className="h-8 px-4 flex items-center text-white font-medium bg-lime-600 rounded-xl">Editar perfil</Link>
                        }
                    </div>
                    <div className="px-6 *:text-[#4A494A]">
                        <h2 className="text-2xl font-semibold">{perfilData.name}</h2>
                        <p>@{perfilData.username}</p>
                        {/* <div className="flex gap-x-3">
                            <Link to="siguiendo" className="hover:underline decoration-[#4A494A]"><span className="font-semibold">10</span> siguiendo</Link>
                            <Link to="seguidores" className="hover:underline decoration-[#4A494A]"><span className="font-semibold">20</span> seguidores</Link>
                        </div> */}
                    </div>
                    <nav className="mt-2 flex border-b border *:text-[#4A494A]">
                        <button className="text-center w-full rounded-none p-4 hover:bg-[#A19FA1] hover:border-none" onClick={() => getPost()}>Post</button>
                        <button className="text-center w-full rounded-none p-4 hover:bg-[#A19FA1] hover:border-none" onClick={() => getPostLiked()}>Me gusta</button>
                    </nav>
                    <PostsPerfil postLista={postLista.content} />
                </div>
            </section>
            <Outlet />
        </>
    )
};

export default Perfil;