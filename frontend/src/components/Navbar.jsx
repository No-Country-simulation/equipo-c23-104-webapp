import React, { useState } from "react";

export default function Navbar({ toggleTextVisibility }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Nuevo estado

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle("dark");
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prevState) => !prevState);
  };

  return (
    <nav
      id="navbar-container"
      className="fixed top-0 z-50 w-full bg-white dark:bg-[#4A494A] dark:border-gray-700 transition-all duration-500 border border-[#A19FA1]"
    >
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              onClick={toggleTextVisibility}
              className="px-3 py-2 mr-2 ml-1 rounded text-sm border hover:border-transparent font-medium bg-white dark:text-white hover:bg-[#00bf00] group dark:hover:bg-gray-600 transition-all duration-200 focus:outline-none"
            >
              <i className="fa-solid fa-bars text-[#00bf00] group-hover:text-white"></i>
            </button>

            <a href="https://flowbite.com" className="flex ms-2 md:me-24 ml-0">
              <img
                src="https://img.a.transfermarkt.technology/portrait/big/28003-1710080339.jpg?lm=1"
                className="h-8 me-3 mr-1 rounded-full"
                alt="FlowBite Logo"
              />
              <span
                id="page-name"
                className={`self-center text-3xl font-semibold whitespace-nowrap dark:text-white hidden md:inline ${
                  isSidebarCollapsed ? "hidden" : ""
                }`}
              >
                Parolu!
              </span>
            </a>
          </div>
          <form className="w-48 sm:w-48 md:w-64 lg:w-96 flex items-center">
            <div className="relative w-full flex items-center">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-3 h-3 text-green-300 hover:text-green-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                placeholder="Buscar personas, comentarios, palabras..."
                className="block w-full p-2 pl-8 text-xs text-gray-900 border-2 rounded-full bg-white placeholder:text-[10px] placeholder:italic hover:shadow-lg focus:ring-0 focus:outline-none dark:bg-[#4A494A] dark:border-gray-600 dark:placeholder-white dark:text-white dark:hover:border-green-600 dark:hover:shadow-lg dark:focus:ring-0 dark:focus:border-green-500"
              />
            </div>
          </form>
          <div className="flex items-center">
            <button
              id="dark-mode-toggle"
              onClick={toggleDarkMode}
              className="text-sm p-2 rounded-full focus:ring-0 focus:outline-none bg-gray-200 dark:bg-[#4A494A] dark:text-white"
            >
              {darkMode ? (
                <i
                  className="fa-solid fa-sun text-yellow-400 rounded-full w-6 h-5"
                  aria-hidden="true"
                ></i>
              ) : (
                <i
                  className="fa-solid fa-moon text-gray-600 dark:text-gray-200 rounded-full w-6 h-5"
                  aria-hidden="true"
                ></i>
              )}
            </button>
            <div className="relative flex items-center ms-3">
              <a
                id="user-button"
                className="flex text-sm border-3 rounded-full w-11 h-11 overflow-hidden hover:shadow-lg focus:ring-0 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:hover:border-green-600 dark:hover:shadow-lg dark:focus:ring-0 dark:focus:border-green-500 transition-all duration-300"
                aria-expanded={isDropdownOpen ? "true" : "false"}
                onClick={toggleDropdown}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-full h-full object-cover"
                  src="https://img.a.transfermarkt.technology/portrait/big/28003-1710080339.jpg?lm=1"
                  alt="user photo"
                />
              </a>
              <div
                id="dropdown-user"
                className={`absolute top-full right-0 mt-3 z-50 w-48 bg-white divide-y divide-gray-100 rounded shadow-lg dark:bg-[#4A494A] dark:divide-gray-600 border border-[#A19FA1] transition-all duration-300 ease-out transform ${
                  isDropdownOpen
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-0 pointer-events-none"
                }`}
              >
                <div className="px-4 py-3">
                  <p className="ml-8 text-sm text-gray-900 dark:text-white">
                    Lionel Messi
                  </p>
                  <p className="ml-8 text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                    messi@test.com
                  </p>
                </div>
                <ul className="py-1">
                  <li>
                    <a
                      href="#"
                      className="m-2 rounded border border-transparent block px-4 py-2 text-sm text-gray-900 transition-all duration-100 hover:bg-[#00bf00] hover:text-white hover:shadow-inner group dark:text-white dark:hover:border-white dark:hover:text-white"
                    >
                      <i className="fa-solid fa-user mr-2 text-[#00bf00] transition-all duration-300 group-hover:text-white"></i>{" "}
                      Panel de perfil
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="m-2 rounded border border-transparent block px-4 py-2 text-sm text-gray-900 transition-all duration-100 hover:bg-[#00bf00] hover:text-white hover:shadow-inner group dark:text-white dark:hover:border-white dark:hover:text-white"
                    >
                      <i className="fa-solid fa-gear mr-2 text-[#00bf00] transition-all duration-300 group-hover:text-white"></i>{" "}
                      Configuración
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="m-2 rounded border border-transparent block px-4 py-2 text-sm text-gray-900 transition-all duration-100 hover:bg-[#00bf00] hover:text-white hover:shadow-inner group dark:text-white dark:hover:border-white dark:hover:text-white"
                    >
                      <i className="fa-solid fa-screwdriver-wrench mr-2 text-[#00bf00] transition-all duration-300 group-hover:text-white"></i>{" "}
                      Mis Recursos
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="m-2 rounded border border-transparent block px-4 py-2 text-sm text-gray-900 transition-all duration-100 hover:bg-[#00bf00] hover:text-white hover:shadow-inner group dark:text-white dark:hover:border-white dark:hover:text-white"
                    >
                      <i className="fa-solid fa-circle-question mr-2 text-[#00bf00] transition-all duration-300 group-hover:text-white"></i>{" "}
                      Ayuda
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="m-2 rounded border border-transparent block px-4 py-2 text-sm text-gray-900 transition-all duration-100 hover:bg-[#00bf00] hover:text-white hover:shadow-inner group dark:text-white dark:hover:border-white dark:hover:text-white"
                    >
                      <i className="fa-solid fa-circle-up mr-2 text-[#00bf00] transition-all duration-300 group-hover:text-white"></i>{" "}
                      Mejorar Plan
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="m-2 rounded border border-transparent block px-4 py-2 text-sm text-gray-900 transition-all duration-100 hover:bg-[#00bf00] hover:text-white hover:shadow-inner group dark:text-white dark:hover:border-white dark:hover:text-white"
                    >
                      <i className="fa-solid fa-right-from-bracket mr-2 text-[#00bf00] transition-all duration-300 group-hover:text-white"></i>{" "}
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
