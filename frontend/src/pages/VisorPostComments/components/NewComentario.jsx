import React, { useState } from 'react';
import axios from 'axios';

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
const apiNewPost = import.meta.env.VITE_POST_CREATE;

console.log(IMGBB_API_KEY)

export default function NewComentario({ onPost }) {
    const [postText, setPostText] = useState('');
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Manejar el cambio en el área de texto
    const handleInputChange = (event) => {
        setPostText(event.target.value);
    };

    // Manejar el cambio en el input de imagen
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    // Subir imagen a ImgBB y obtener URL
    const uploadImage = async () => {
        if (!image) return null;
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data.data.url;
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            alert('Hubo un error al subir la imagen.');
            return null;
        }
    };

    // Manejar la publicación
    const handlePost = async () => {

        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          alert("No tienes una sesión activa");
          return;
        }

        if (postText.trim() === '') {
            alert('Por favor, escribe algo antes de publicar.');
            return;
        }

        setIsLoading(true);
        let imageUrl = null;
        
        if (image) {
            imageUrl = await uploadImage();
        }

        const newPost = {
            content: postText,
            imgUrls: [imageUrl], // Agregar la URL de la imagen subida
            community: {id:1}
        };

        try {
            console.log(newPost);
            const response = await axios.post(apiNewPost, newPost, {
                headers: { Authorization: `Bearer ${authToken}` }
              });
            alert('Publicación creada con éxito.');
            setPostText('');
            setImage(null);
            if (onPost) onPost(response.data);
        } catch (error) {
            console.error('Error al crear la publicación:', error);
            alert('Hubo un error al intentar crear la publicación.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white w-full p-8 h-auto my-auto z-10 border-b-2">
            <textarea
                className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                rows="4"
                placeholder="¿En qué estás pensando?"
                value={postText}
                onChange={handleInputChange}
            ></textarea>
            <div className="flex items-center mt-4">
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-md focus:ring-2 focus:ring-blue-500">
                    Subir imagen
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </label>
                {image && (
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Vista previa"
                        className="w-16 h-16 rounded-md ml-4 object-cover"
                    />
                )}
            </div>

            <button
                className="mt-4 bg-lime-600 hover:bg-lime-700 text-white px-6 py-2 rounded-md shadow-md focus:outline-none"
                onClick={handlePost}
                disabled={isLoading}
            >
                {isLoading ? 'Publicando...' : 'Publicar'}
            </button>
        </div>
    );
}
