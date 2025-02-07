import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './components/Post';
import NewPost from './components/NewPost';

const apiGetPosts = import.meta.env.VITE_GET_POSTS;

export default function Home() {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
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
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div className='container m-auto md:w-1/2 my-20'>
        <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2 h-full'>
          <NewPost onNewPost={getPosts}/>
          {posts.map((post) => (
            <Post
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
