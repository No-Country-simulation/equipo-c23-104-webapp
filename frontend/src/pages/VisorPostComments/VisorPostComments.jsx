import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCompleto from './components/PostCompleto';
import Post from "../Home/components/Post";
import Comentario from './components/Comentarios';
import NewComentario from './components/NewComentario';

const apiGetPosts = import.meta.env.VITE_GET_POSTS;

export default function VisorPostComments(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      alert("No tienes una sesión activa");
      return;
    }
    // Realizamos la consulta con Axios
    axios
      .get(apiGetPosts, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      .then((response) => {
        console.log(response.data.content);
        setPosts(response.data.content.reverse()); // Guardamos las publicaciones en el estado
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div>
      <div className='container m-auto md:w-2/3 my-20'>
      {posts.length > 0 ? (
  <PostCompleto
    id={posts[0].id}
    nombre={posts[0].nameUser}
    textos={[posts[0].content]}
    imagePerfil={posts[0].urlProfile}
    imagenPost={posts[0].imgUrls?.[0]} // Evita error si imgUrls es undefined
    publicationDate={posts[0].postDate}
    likes={posts[0].interactionCount}
    comentarios={posts[0].repliesCount}
    username={posts[0].username}
  />
) : (
  <h1>No hay posts</h1>
)}
    <NewComentario />
        <div className=''>
          {posts.map((post) => (
            <Comentario
              id={post.id}
              nombre={post.nameUser} // Usando la URL de la foto de perfil
              textos={[post.content]} // Pasamos el contenido como texto
              imagePerfil={post.urlProfile} // Usamos la foto como imagen del post
              imagenPost={post.imgUrls[0]} // Usamos la URL de la imagen del post
              publicationDate={post.postDate} // Usamos la fecha de creación del post
              likes={post.interactionCount} // Usamos la fecha de creación del post
              comentarios={post.repliesCount} // Usamos la fecha de creación del post
              username={post.username} // Usando la URL de la foto de perfil

            />
          ))}
        </div>
      </div>
    </div>
  );
}
