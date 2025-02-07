import React, { useState } from 'react';
import axios from 'axios';

const apiPostLike = import.meta.env.VITE_POST_LIKE;

export default function Post(props) {
    const { textos, username, imagePerfil, nombre, publicationDate, imagenPost, likes, comentarios, id } = props;
    
    const [likeCount, setLikeCount] = useState(likes);
    const [liked, setLiked] = useState(false);

    const getRelativeTime = (dateString) => {
        const now = new Date();
        const publication = new Date(dateString);
        const diffInSeconds = Math.floor((now.getTime() - publication.getTime()) / 1000);

        if (diffInSeconds < 0) return "Just now";
        if (diffInSeconds < 60) return `${diffInSeconds} second${diffInSeconds === 1 ? '' : 's'} ago`;
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays === 1) return "Yesterday";
        if (diffInDays <= 6) return `${diffInDays} days ago`;
        const diffInWeeks = Math.floor(diffInDays / 7);
        if (diffInWeeks < 4) return `${diffInWeeks} week${diffInWeeks === 1 ? '' : 's'} ago`;
        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;
        const diffInYears = Math.floor(diffInDays / 365);
        return `${diffInYears} year${diffInYears === 1 ? '' : 's'} ago`;
    };

    const handleLike = async () => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            alert("No tienes una sesión activa");
            return;
        }
        
        try {
            await axios.post(`${apiPostLike}/${id}`, {}, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            
            setLikeCount(prev => liked ? prev - 1 : prev + 1);
            setLiked(!liked);
        } catch (error) {
            console.error('Error al dar like:', error);
        }
    };

    return (
        <div className="bg-white w-full p-8 rounded-md shadow-lg h-auto my-auto border">
            <div className="flex items-center justify-start border-b-2 border-gray-300 pb-4">
                {imagePerfil ? (
                    <img src={imagePerfil} alt="Perfil" className="w-16 h-16 p-2 rounded-full" />
                ) : (
                    <div className="w-16 h-16 p-2 rounded-full bg-lime-600 flex items-center justify-center">
                        <span className="text-white text-xl font-bold">
                            {nombre ? nombre.charAt(0).toUpperCase() : '?'}
                        </span>
                    </div>
                )}
                <div className="ml-4 w-full text-start">
                    <p className="text-xl lg:text-2xl font-bold text-gray-700">{nombre}</p>
                    <p className="text-md text-gray-700">@{username}</p>
                    <p className="text-sm text-gray-500">{getRelativeTime(publicationDate)}</p>
                </div>
            </div>
            <p className="text-xl mt-5 lg:text-xl text-gray-700">{textos}</p>
            {
                imagenPost? <img src={imagenPost} alt="" className='w-3/5 mx-auto h-auto rounded-md my-3'/> : null
            }
            <div className="flex justify-start items-center mt-5 space-x-6">
                <button
                    className={`flex items-center ${liked ? 'text-red-600' : 'text-gray-700 hover:text-red-600'} focus:outline-none`}
                    onClick={handleLike}
                >
                    <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                        />
                    </svg>
                    <span>{likeCount} Likes</span>
                </button>
                <button className="flex items-center text-gray-700 hover:text-lime-600 focus:outline-none">
                    <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M21 12.9V19a2 2 0 01-2 2H6a2 2 0 01-2-2v-6.1a6 6 0 1112 0z"
                        />
                    </svg>
                    <span>{comentarios} Comments</span>
                </button>
            </div>
        </div>
    );
}
