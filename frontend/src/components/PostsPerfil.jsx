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
                      key={post.id}
                      nombre={post.username} 
                      textos={[post.content]} 
                      imagePerfil={post.profilePictureUrl} 
                      imagenPost={post.imageUrl} 
                      publicationDate={post.publicationDate} 
                  />
              ))
            ) : (
              <p className="text-center text-lg">No hay publicaciones</p>
            )}
        </div>
    );
};

export default PostsPerfil;
