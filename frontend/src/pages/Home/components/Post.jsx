import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

export default function Post(props) {
    const { textos, image, nombre, fecha } = props;
    const [likes, setLikes] = useState(500);
    const [comments, setComments] = useState(120);

    // Crear una secuencia intercalando cada texto con un delay de 1000 ms
    const sequenceArray = textos.flatMap(text => [text, 1000]);

    // Manejar incremento de likes
    const handleLike = () => {
        setLikes(likes + 1);
    };

    return (
        <div className='bg-white w-full p-8 rounded-md shadow-lg h-auto my-auto z-10 border'>
            <div className="flex items-center justify-start border-b-2 border-gray-300 pb-4">
                <img src={image} alt="" className="w-16 h-16 rounded-full" />
                <div className="ml-4 w-full text-start">
                    <p className="text-xl lg:text-2xl font-bold text-gray-700">{nombre}</p>
                    <p className="text-sm text-gray-500">{`1h ago`}</p>
                </div>
            </div>
            <p className='text-xl mt-5 lg:text-xl text-gray-700'>
                {sequenceArray[0]}
            </p>

            <div className="flex justify-start items-center mt-5 space-x-6">
                <button 
                    className="flex items-center text-gray-700 hover:text-red-600 focus:outline-none"
                    onClick={handleLike}
                >
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                    <span>{likes} Likes</span>
                </button>
                <button className="flex items-center text-gray-700 hover:text-lime-600 focus:outline-none">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12.9V19a2 2 0 01-2 2H6a2 2 0 01-2-2v-6.1a6 6 0 1112 0z" />
                    </svg>
                    <span>{comments} Comments</span>
                </button>
            </div>
        </div>
    );
}
