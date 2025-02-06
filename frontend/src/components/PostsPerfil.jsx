import PostTarjeta from "./PostTarjeta";
import Post from '../pages/Home/components/Post';
import { useState, useEffect } from 'react';

const PostsPerfil = ({ postLista = [] }) => { // 👈 Asigna un array vacío por defecto
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (Array.isArray(postLista)) {
            setPosts(postLista);
        } else {
            setPosts([]); // 👈 Asegura que el estado siempre sea un array
        }
    }, [postLista]);

    return (
        <div className="p-4 flex flex-col gap-y-4">
            {posts.length  ? (
              posts.map((post) => (
                  <Post
                  id={post.id}
                  nombre={post.nameUser} // Usando la URL de la foto de perfil
                  username={post.username} // Usando la URL de la foto de perfil
                  textos={[post.content]} // Pasamos el contenido como texto
                  imagePerfil={post.urlProfile} // Usamos la foto como imagen del post
                  imagenPost={post.imgUrls[0]} // Usamos la URL de la imagen del post
                  publicationDate={post.postDate} // Usamos la fecha de creación del post
                  likes={post.interactionCount} // Usamos la fecha de creación del post
                  comentarios={post.repliesCount} // Usamos la fecha de creación del post
                  />
              ))
            ) : (
              <p className="text-center text-lg">No hay publicaciones</p>
            )}
        </div>
    );
};

export default PostsPerfil;
