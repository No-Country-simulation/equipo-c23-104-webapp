import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './components/Post';
import CreatePost from './components/NewPost';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Realizamos la consulta con Axios
    axios
      .get('http://localhost:3000/posts')
      .then((response) => {
        setPosts(response.data); // Guardamos las publicaciones en el estado
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div>
      <div className='container m-auto md:w-1/2 my-20'>
        <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2 h-full'>
          <CreatePost/>
          {posts.map((post) => (
            <Post
              key={post.id}
              nombre={post.username} // Usando la URL de la foto de perfil
              textos={[post.content]} // Pasamos el contenido como texto
              image={post.profilePictureUrl} // Usamos la foto como imagen del post
              publicationDate={post.publicationDate} // Usamos la fecha de creación del post
            />
          ))}
        </div>
      </div>
    </div>
  );
}
