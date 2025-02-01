import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import "./style.css";

export default function Publications({ searchQuery }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [publications, setPublications] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleCreatePublication = (e) => {
    e.preventDefault();
    const newPublication = {
      title,
      description,
      image,
      comments: [],
    };
    setPublications([newPublication, ...publications]);
    setIsModalOpen(false);
    setTitle("");
    setDescription("");
    setImage(null);
  };

  const handleAddComment = (index) => {
    if (!commentText.trim()) return;
    const updatedPublications = [...publications];
    if (!updatedPublications[index].comments) {
      updatedPublications[index].comments = [];
    }
    updatedPublications[index].comments.push(commentText);
    setPublications(updatedPublications);
    setCommentText("");
    setTimeout(() => {
      const commentElements = document.querySelectorAll(".comment-item");
      commentElements.forEach((el) => {
        el.classList.add("opacity-100", "translate-y-0");
      });
    }, 100);
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredPublications = publications.filter(
    (publication) =>
      publication.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      publication.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <article className="p-4 sm:ml-64 lg:ml-96 max-w-5xl mx-auto flex justify-center items-center contenedor-article">
      <div className="py-8 px-16 border-r border-l border-gray-100 rounded dark:border-gray-700 mt-14 w-full">
        {publications.length > 0 && (
          <h2 className="text-sm font-medium text-gray-900 dark:text-white mb-4 text-center">
            <i className="fa-solid fa-arrows-rotate text-green-600"></i>{" "}
            Publicaciones Recientes
          </h2>
        )}
        <div className="flex justify-end mb-4">
          <button
            id="create-button-publications"
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-3 text-white rounded-full hover:shadow-lg"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                <i className="fa-solid fa-pen-to-square"></i> Crear Publicación
              </h3>
              <form onSubmit={handleCreatePublication}>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm text-gray-700 mb-1"
                  >
                    <i className="fa-solid fa-signature"></i> Título
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
                    <i className="fa-solid fa-comment-dots"></i> Descripción
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
                    <i className="fa-solid fa-image"></i> Imagen
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
                    <i className="fa-solid fa-xmark"></i> Cancelar
                  </button>
                  <button
                    id="create-publications"
                    type="submit"
                    className="px-6 py-2  text-white rounded-md text-sm hover:shadow-lg"
                  >
                    <i className="fa-solid fa-check"></i> Crear
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="space-y-4 mt-8">
          {filteredPublications.length === 0 ? (
            <div className="text-center text-gray-500 text-xs">
              No se han ingresado publicaciones...
            </div>
          ) : (
            filteredPublications.map((publication, index) => (
              <div
                key={index}
                className="contenedor-publicaciones w-96 bg-white rounded shadow-md dark:bg-gray-800 border border-[#A19FA1] mx-auto"
              >
                <div
                  onClick={() => toggleExpand(index)}
                  className="cursor-pointer p-5 dark:bg-[#4A494A] rounded"
                >
                  {publication.image && (
                    <img
                      className="rounded w-full h-56 object-cover"
                      src={URL.createObjectURL(publication.image)}
                      alt={`Publication ${index + 1}`}
                    />
                  )}
                  <h5 className="text-sm font-bold text-gray-900 dark:text-white mt-2">
                    {publication.title}
                  </h5>
                  <p className="text-xs text-gray-700 dark:text-gray-400 mt-2">
                    {publication.description}
                  </p>
                  {publication.comments?.length > 0 && (
                    <h6
                      id="ver-comentarios"
                      className="text-[11px] font-semibold text-gray-900 dark:text-white mt-2"
                    >
                      Ver {publication.comments.length} comentarios
                    </h6>
                  )}
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedIndex === index
                      ? "max-h-60 opacity-100 p-4"
                      : "max-h-0 opacity-0"
                  } border-t border-[#A19FA1] dark:bg-[#4A494A]`}
                >
                  {publication.comments?.map((comment, i) => (
                    <p
                      key={i}
                      className="comment-item text-[11px] text-gray-700 dark:text-gray-400 mt-1 transition-all duration-300 ease-in-out opacity-0 translate-y-2 animate-[fadeIn_0.3s_ease-in-out_forwards]"
                    >
                      - {comment}
                    </p>
                  ))}
                </div>

                <div className="p-4 relative dark:bg-[#4A494A] border-t border-[#A19FA1]">
                  <form
                    className="relative flex items-center"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddComment(index);
                    }}
                  >
                    <input
                      name="comment"
                      type="text"
                      placeholder="Agregar comentario..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="block w-full p-2 pr-10 text-xs text-gray-900 border-1 focus:border-[#00bf00] border-[#00bf00] rounded bg-white placeholder:text-[11px] placeholder:italic hover:shadow-lg focus:ring-0 focus:outline-none dark:bg-[#4A494A] dark:placeholder-white dark:text-white dark:hover:shadow-lg transition-all duration-200"
                    />
                    <button
                      type="button"
                      className="text-[11px] absolute right-32 top-1/2 transform -translate-y-1/2 bg-transparent border-none outline-none focus:outline-none hover:bg-transparent"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      😀
                    </button>

                    <button
                      type="submit"
                      className="flex justify-center items-center px-5 bg-[#00bf00] text-white text-[12px] rounded ml-2 border hover:border-transparent"
                    >
                      <i className="fa-solid fa-paper-plane mr-1.5 text-[10px]"></i>
                      Comentar
                    </button>
                  </form>
                  {showEmojiPicker && (
                    <div className="absolute bottom-12 left-0 z-10 bg-white shadow-lg rounded-lg p-2">
                      <EmojiPicker
                        onEmojiClick={(emojiData) => {
                          setCommentText((prev) => prev + emojiData.emoji);
                          setShowEmojiPicker(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </article>
  );
}
