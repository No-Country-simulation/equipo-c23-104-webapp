import React from "react";

export default function Sidebar({ isTextVisible }) {
  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 h-screen pt-20 bg-white sm:translate-x-0 dark:bg-[#4A494A] dark:border-gray-700 transition-all duration-500 ${
        isTextVisible ? "w-80" : "w-16"
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-[#4A494A] mt-4 transition-all duration-500">
        <ul className="space-y-2 font-medium">
          <li className="ml-1">
            <a
              href="#"
              className="flex items-center px-3 py-2 text-gray-900 rounded dark:text-white dark:hover:border-white dark:hover:text-black hover:bg-gray-100 dark:hover:bg-white group text-sm hover:text-black hover:font-bold"
            >
              <span className="">
                <i id="house-icon" className="fa-solid fa-house"></i>
                {isTextVisible && <span className="ml-3">Inicio</span>}
              </span>
            </a>
          </li>
          <li className="ml-1">
            <a
              href="#"
              className="flex items-center px-3 py-2 text-gray-900 rounded dark:text-white dark:hover:border-white dark:hover:text-black hover:bg-gray-100 dark:hover:bg-white group text-sm hover:text-black hover:font-bold"
            >
              <span className="flex-1 whitespace-nowrap">
                <i id="explorer-icon" className="fa-brands fa-searchengin"></i>
                {isTextVisible && <span className="ml-3">Explorar</span>}
              </span>
            </a>
          </li>
          <li className="ml-1">
            <a
              href="#"
              className="flex items-center px-3 py-2 text-gray-900 rounded dark:text-white dark:hover:border-white dark:hover:text-black dark:hover:bg-white group text-sm hover:text-black hover:font-bold"
            >
              <span className="flex-1 ms-2 whitespace-nowrap">
                <i id="users-icon" className="fa-solid fa-users"></i>
                {isTextVisible && <span className="ml-2">Comunidades</span>}
              </span>
            </a>
          </li>
          <li className="ml-1">
            <a
              href="#"
              className="flex items-center px-3 py-2 text-gray-900 rounded dark:text-white dark:hover:border-white dark:hover:text-black dark:hover:bg-white group text-sm hover:text-black hover:font-bold"
            >
              <span className="flex-1 ms-2 whitespace-nowrap">
                <i
                  id="microphone-icon"
                  className="fa-solid fa-microphone-lines"
                ></i>
                {isTextVisible && <span className="ml-4">Practicar</span>}
              </span>
            </a>
          </li>
          <li className="ml-1">
            <a
              href="#"
              className="flex items-center px-3 py-2 text-gray-900 rounded dark:text-white dark:hover:border-white dark:hover:text-black dark:hover:bg-white group text-sm hover:text-black hover:font-bold"
            >
              <span className="flex-1 ms-2 whitespace-nowrap">
                <i
                  id="resources-icon"
                  className="fa-solid fa-screwdriver-wrench"
                ></i>
                {isTextVisible && <span className="ml-3">Recursos</span>}
              </span>
            </a>
          </li>
          <li className="ml-1">
            <a
              href="#"
              className="flex items-center px-3 py-2 text-gray-900 rounded dark:text-white dark:hover:border-white dark:hover:text-black dark:hover:bg-white group text-sm hover:text-black hover:font-bold"
            >
              <span className="flex-1 ms-2 whitespace-nowrap">
                <i id="message-icon" className="fa-solid fa-envelope"></i>
                {isTextVisible && <span className="ml-3">Mensajes</span>}
              </span>
            </a>
          </li>
          <li className="ml-1">
            <a
              href="#"
              className="flex items-center px-3 py-2 text-gray-900 rounded dark:text-white dark:hover:border-white dark:hover:text-black dark:hover:bg-white group text-sm hover:text-black hover:font-bold"
            >
              <span className="flex-1 ms-2 whitespace-nowrap">
                <i id="notifications-icon" className="fa-solid fa-bell"></i>
                {isTextVisible && <span className="ml-3">Notificaciones</span>}
              </span>
            </a>
          </li>
          <li className="ml-1">
            <a
              href="#"
              className="flex items-center px-3 py-2 text-gray-900 rounded dark:text-white dark:hover:border-white dark:hover:text-black dark:hover:bg-white group text-sm hover:text-black hover:font-bold"
            >
              <span className="flex-1 ms-2 whitespace-nowrap">
                <i id="premium-icon" className="fa-solid fa-medal"></i>
                {isTextVisible && <span className="ml-3">Premium</span>}
              </span>
            </a>
          </li>
          <li className="ml-1">
            <a
              href="#"
              className="flex items-center px-3 py-2 text-gray-900 rounded dark:text-white dark:hover:border-white dark:hover:text-black dark:hover:bg-white group text-sm hover:text-black hover:font-bold"
            >
              <span className="flex-1 ms-2 whitespace-nowrap">
                <i
                  id="logout-icon"
                  className="fa-solid fa-right-from-bracket"
                ></i>
                {isTextVisible && <span className="ml-3">Cerrar sesión</span>}
              </span>
            </a>
          </li>
        </ul>

        <button
          id="create-button"
          type="button"
          className="focus:outline-none text-white dark:border-white focus:ring-4 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2 w-56 mt-3 hover:shadow-lg transition-all duration-300"
        >
          <i className="fa-solid fa-plus"></i> {isTextVisible && "Crear"}
        </button>
      </div>
    </aside>
  );
}
