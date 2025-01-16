import React from "react";

export default function Sidebar() {
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-80 h-screen pt-20 transition-transform -translate-x-full bg-white  sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group text-sm ml-8 mr-8 hover:text-black hover:font-bold"
            >
              <span className="ms-3">
                <i className="fa-solid fa-house text-green-600"></i>
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
                <i className="fa-brands fa-searchengin text-green-600"></i>
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
                <i className="fa-solid fa-bell text-green-600"></i>
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
                <i className="fa-solid fa-envelope text-green-600"></i>
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
                <i className="fa-solid fa-users text-green-600"></i>
                <span className="ml-3">Comunidades</span>
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group text-sm ml-8 mr-8 hover:text-black hover:font-bold"
            >
              <span className="flex-1 ms-3 whitespace-nowrap">
                <i className="fa-solid fa-medal text-green-600"></i>
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
                <i className="fa-solid fa-user text-green-600"></i>
                <span className="ml-3">Perfil</span>
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group text-sm ml-8 mr-8 hover:text-black hover:font-bold"
            >
              <span className="flex-1 ms-3 whitespace-nowrap">
                <i className="fa-solid fa-circle-info text-green-600"></i>
                <span className="ml-3">Mas</span>
              </span>
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-56 ml-8 mr-8 mt-2 hover:border-green-500 hover:shadow-lg transition-all duration-300"
        >
          <i className="fa-solid fa-plus"></i> Crear
        </button>
      </div>
    </aside>
  );
}
