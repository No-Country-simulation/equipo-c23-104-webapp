import React, { useState } from 'react';
import axios from 'axios';

export default function NewPost({ onPost }) {
    const [postText, setPostText] = useState('');
    const [image, setImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Manejar el cambio en el área de texto
    const handleInputChange = (event) => {
        setPostText(event.target.value);
    };

    // Manejar el cambio en el input de imagen
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    // Manejar la publicación
    const handlePost = async () => {
        if (postText.trim() === '') {
            alert('Por favor, escribe algo antes de publicar.');
            return;
        }

        const newPost = {
            username: 'Tu Nombre', // Cambiar dinámicamente si es necesario
            views: 0,
            profilePictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwNKNyfU1Gvp2ELPqa-dMVWCV_I4Db8fgHUg&s',
            publicationDate: new Date().toISOString().split('T')[0],
            content: postText,
            likes: 0,
            commentsCount: 0,
        };

        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:3000/posts', newPost);
            alert('Publicación creada con éxito.');
            //onPost(response.data); // Actualiza el estado o las publicaciones en el componente padre si es necesario
            setPostText('');
            setImage('');
        } catch (error) {
            console.error('Error al crear la publicación:', error);
            alert('Hubo un error al intentar crear la publicación.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white w-full p-8 rounded-md shadow-lg h-auto my-auto z-10 border">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-700 mb-4">Crear nueva publicación</h2>
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
                        src={image}
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
