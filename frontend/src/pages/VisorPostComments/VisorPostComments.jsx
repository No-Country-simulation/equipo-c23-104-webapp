import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import PostCompleto from './components/PostCompleto';
import Comentario from './components/Comentarios';
import NewComentario from './components/NewComentario';

export default function VisorPostComments() {
  const location = useLocation();
  const post = location.state;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!post) return;
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      alert("No tienes una sesión activa");
      return;
    }
    axios
      .get(`${import.meta.env.VITE_GET_COMMENTS}/${post.id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      .then((response) => {
        setComments(response.data.content.reverse());
        console.log("EXITO AL OBTENER COMENTARIOS->", response.data.content);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, [post]);

  if (!post) {
    return <h1>No hay post seleccionado</h1>;
  }

  return (
    <div className='container m-auto md:w-2/3 my-20'>
      <PostCompleto
        id={post.id}
        nombre={post.nombre}
        textos={post.textos}
        imagePerfil={post.imagePerfil}
        imagenPost={post.imagenPost}
        publicationDate={post.publicationDate}
        likes={post.likes}
        comentarios={post.comentarios}
        username={post.username}
      />
      <NewComentario id={post.id}/>
      <div>
        {comments.map((comment) => (
          <Comentario
            key={comment.id}
            id={comment.id}
            nombre={comment.name}
            textos={[comment.content]}
            imagePerfil={comment.urlProfile}
            imagenPost={comment.imgUrls[0]}
            publicationDate={comment.date}
            likes={comment.interactionCount}
            comentarios={comment.repliesCount}
            username={comment.username}
          />
        ))}
      </div>
    </div>
  );
}
