import React from "react";

export default function Sidebar() {
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-80 h-screen pt-20 transition-transform -translate-x-full bg-white  sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 mt-4">
        <ul className="space-y-2 font-medium">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group text-sm ml-8 mr-8 hover:text-black hover:font-bold"
            >
              <span className="ms-3">
                <i id="house-icon" className="fa-solid fa-house "></i>
                <span className="ml-3">Inicio</span>
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group text-sm ml-8 mr-8 hover:text-black hover:font-bold"
            >
              <span className="flex-1 ms-3 whitespace-nowrap">
                <i id="explorer-icon" className="fa-brands fa-searchengin "></i>
                <span className="ml-3">Explorar</span>
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group text-sm ml-8 mr-8 hover:text-black hover:font-bold"
            >
              <span className="flex-1 ms-3 whitespace-nowrap">
                <i id="users-icon" className="fa-solid fa-users "></i>
                <span className="ml-2">Comunidades</span>
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group text-sm ml-8 mr-8 hover:text-black hover:font-bold"
            >
              <span className="flex-1 ms-3 whitespace-nowrap">
                <i
                  id="microphone-icon"
                  class="fa-solid fa-microphone-lines "
                ></i>
                <span className="ml-4">Practicar</span>
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group text-sm ml-8 mr-8 hover:text-black hover:font-bold"
            >
              <span className="flex-1 ms-3 whitespace-nowrap">
                <i
                  id="resources-icon"
                  class="fa-solid fa-screwdriver-wrench "
                ></i>
                <span className="ml-3">Recursos</span>
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group text-sm ml-8 mr-8 hover:text-black hover:font-bold"
            >
              <span className="flex-1 ms-3 whitespace-nowrap">
                <i id="message-icon" className="fa-solid fa-envelope"></i>
                <span className="ml-3">Mensajes</span>
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group text-sm ml-8 mr-8 hover:text-black hover:font-bold"
            >
              <span className="flex-1 ms-3 whitespace-nowrap">
                <i id="notifications-icon" className="fa-solid fa-bell "></i>
                <span className="ml-3">Notificaciones</span>
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group text-sm ml-8 mr-8 hover:text-black hover:font-bold"
            >
              <span className="flex-1 ms-3 whitespace-nowrap">
                <i id="premium-icon" className="fa-solid fa-medal"></i>
                <span className="ml-3">Premium</span>
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group text-sm ml-8 mr-8 hover:text-black hover:font-bold"
            >
              <span className="flex-1 ms-3 whitespace-nowrap">
                <i id="logout-icon" class="fa-solid fa-right-from-bracket "></i>
                <span className="ml-3">Cerrar sesión</span>
              </span>
            </a>
          </li>
        </ul>

        <button
          id="create-button"
          type="button"
          className="focus:outline-none text-white   focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2    w-56 ml-8 mr-8 mt-3  hover:shadow-lg transition-all duration-300"
        >
          <i className="fa-solid fa-plus"></i> Crear
        </button>
      </div>
    </aside>
  );
}
