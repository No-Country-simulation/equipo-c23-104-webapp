import React, { useState } from "react";
import "./style.css";

export default function Publications() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [publications, setPublications] = useState([]);

  const handleCreatePublication = (e) => {
    e.preventDefault();
    const newPublication = {
      title,
      description,
      image,
    };
    setPublications([newPublication, ...publications]);
    setIsModalOpen(false);
    setTitle("");
    setDescription("");
    setImage(null);
  };
  return (
    <article className="p-4 sm:ml-64 lg:ml-96 max-w-5xl mx-auto  flex justify-center items-center contenedor-article">
      <div className="py-8 px-16 border-r border-l border-gray-100 rounded dark:border-gray-700 mt-14 w-full">
        {publications.length > 0 && (
          <h2 className="text-sm font-medium text-gray-900 dark:text-white mb-4 text-center">
            <i className="fa-solid fa-arrows-rotate text-green-600"></i>{" "}
            Publicaciones Recientes
          </h2>
        )}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-3 bg-green-700 text-white rounded-full hover:bg-green-600 hover:shadow-lg"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                <i class="fa-solid fa-pen-to-square"></i> Crear Publicación
              </h3>
              <form onSubmit={handleCreatePublication}>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm text-gray-700 mb-1"
                  >
                    <i class="fa-solid fa-signature"></i> Título
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded-md bg-white text-sm placeholder:text-xs placeholder:text-gray-500 text-black"
                    placeholder="Título de la publicación"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm text-gray-700 mb-1"
                  >
                    <i class="fa-solid fa-comment-dots"></i> Descripción
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded-md bg-white text-sm placeholder:text-xs resize-none placeholder:text-gray-500 text-black"
                    placeholder="Descripción de la publicación"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="image"
                    className="block text-sm text-gray-700 mb-1"
                  >
                    <i class="fa-solid fa-image"></i> Imagen
                  </label>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full p-2 border rounded-md text-sm placeholder:text-xs"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md text-sm hover:shadow-lg"
                  >
                    <i class="fa-solid fa-xmark"></i> Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-700 text-white rounded-md text-sm hover:shadow-lg"
                  >
                    <i class="fa-solid fa-check"></i> Crear
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="space-y-4 mt-8">
          {publications.length === 0 ? (
            <div className="text-center text-gray-500 text-xs">
              No se han ingresado publicaciones...
            </div>
          ) : (
            publications.map((publication, index) => (
              <div
                key={index}
                className="contenedor-publicaciones w-96 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mx-auto"
              >
                {publication.image && (
                  <img
                    className="rounded-t-lg w-full h-56 object-cover"
                    src={URL.createObjectURL(publication.image)}
                    alt={`Publication Image ${index + 1}`}
                  />
                )}
                <div className="p-5">
                  <h5 className="text-sm font-bold text-gray-900 dark:text-white">
                    {publication.title}
                  </h5>
                  <p className="text-xs text-gray-700 dark:text-gray-400 mt-2">
                    {publication.description}
                  </p>
                  <div className="flex justify-start space-x-2 mt-4">
                    <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-sm hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600">
                      <i className="fa-regular fa-comment fa-xs text-gray-600 dark:text-gray-300"></i>
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-sm hover:bg-red-100 dark:bg-gray-700 dark:hover:bg-gray-600">
                      <i className="fa-regular fa-heart fa-xs text-gray-600 dark:text-gray-300"></i>
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-sm hover:bg-green-100 dark:bg-gray-700 dark:hover:bg-gray-600">
                      <i className="fa-solid fa-share fa-xs text-gray-600 dark:text-gray-300"></i>
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-sm hover:bg-yellow-100 dark:bg-gray-700 dark:hover:bg-gray-600">
                      <i className="fa-regular fa-bookmark fa-xs text-gray-600 dark:text-gray-300"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </article>
  );
}
