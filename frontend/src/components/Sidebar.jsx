import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function Sidebar({ isTextVisible, showText }) {
  const { t } = useTranslation();

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 h-screen pt-20 bg-white sm:translate-x-0 dark:bg-[#4A494A] dark:border-gray-700 transition-all duration-500 border border-[#A19FA1] ${
        isTextVisible ? "w-64" : "w-16"
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-[#4A494A] mt-4 transition-all duration-500">
        <ul className="space-y-0 font-medium ">
          <li
            className={`flex items-center px-3 py-2 text-gray-900 rounded hover:bg-[#00bf00] transition-all duration-100 hover:text-white hover:shadow-inner group border border-transparent dark:text-white dark:hover:border-white dark:hover:text-white group text-[13px] ${
              isTextVisible ? "w-56 h-10" : "w-10 h-10 rounded-full"
            }`}
          >
            <a
              className={`flex items-center w-full h-full transition-opacity duration-500 ease-in-out ${
                showText ? "opacity-100" : "opacity-0"
              }`}
              href="#"
              title={!isTextVisible ? "Inicio" : ""}
            >
              <i className="fa-solid fa-house text-[#00bf00] dark:text-white transition-all duration-100 group-hover:text-white"></i>
              {isTextVisible && (
                <span
                  className={`ml-3 text-[#4A494A] group-hover:text-white dark:text-white transition-all duration-200 ease-in-out transform overflow-hidden ${
                    isTextVisible
                      ? "opacity-100 translate-x-0 w-auto"
                      : "opacity-0 translate-x-[-10px] w-0"
                  }`}
                >
                  {t("home")}
                </span>
              )}
            </a>
          </li>
          <li
            className={` flex items-center px-3 py-2 text-gray-900 rounded hover:bg-[#00bf00] transition-all duration-100 hover:text-white hover:shadow-inner group border border-transparent dark:text-white dark:hover:border-white dark:hover:text-white group text-[13px] ${
              isTextVisible ? "w-56 h-10" : "w-10 h-10 rounded-full"
            }`}
          >
            <a
              className={`flex items-center w-full h-full transition-opacity duration-500 ease-in-out ${
                showText ? "opacity-100" : "opacity-0"
              }`}
              href="#"
              title={!isTextVisible ? "Explorar" : ""}
            >
              <i className="fa-brands fa-searchengin ml-0.5 text-[#00bf00] dark:text-white transition-all duration-100 group-hover:text-white"></i>
              {isTextVisible && (
                <span
                  className={`ml-3 text-[#4A494A] group-hover:text-white dark:text-white transition-all duration-200 ease-in-out transform ${
                    isTextVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2 w-0 overflow-hidden"
                  }`}
                >
                  {t("explorer")}
                </span>
              )}
            </a>
          </li>
          <li
            className={`flex items-center px-3 py-2 text-gray-900 rounded hover:bg-[#00bf00] transition-all duration-100 hover:text-white hover:shadow-inner group border border-transparent dark:text-white dark:hover:border-white dark:hover:text-white group text-[13px] ${
              isTextVisible ? "w-56 h-10" : "w-10 h-10 rounded-full"
            }`}
          >
            <a
              className={`flex items-center w-full h-full transition-opacity duration-500 ease-in-out ${
                showText ? "opacity-100" : "opacity-0"
              }`}
              href="#"
              title={!isTextVisible ? "Comunidades" : ""}
            >
              <i className="fa-solid fa-users text-[#00bf00] dark:text-white transition-all duration-100 group-hover:text-white"></i>
              {isTextVisible && (
                <span
                  className={`ml-2 text-[#4A494A] group-hover:text-white dark:text-white transition-all duration-200 ease-in-out transform ${
                    isTextVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2 w-0 overflow-hidden"
                  }`}
                >
                  {t("community")}
                </span>
              )}
            </a>
          </li>
          <li
            className={`flex items-center px-3 py-2 text-gray-900 rounded hover:bg-[#00bf00] transition-all duration-100 hover:text-white hover:shadow-inner group border border-transparent dark:text-white dark:hover:border-white dark:hover:text-white group text-[13px] ${
              isTextVisible ? "w-56 h-10" : "w-10 h-10 rounded-full"
            }`}
          >
            <a
              className={`flex items-center w-full h-full transition-opacity duration-500 ease-in-out ${
                showText ? "opacity-100" : "opacity-0"
              }`}
              href="#"
              title={!isTextVisible ? "Practicar" : ""}
            >
              <i className="fa-solid fa-microphone-lines ml-0.5 text-[#00bf00] dark:text-white transition-all duration-100 group-hover:text-white"></i>
              {isTextVisible && (
                <span
                  className={`ml-3 text-[#4A494A] group-hover:text-white dark:text-white transition-all duration-200 ease-in-out transform ${
                    isTextVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2 w-0 overflow-hidden"
                  }`}
                >
                  {t("practice")}
                </span>
              )}
            </a>
          </li>
          <li
            className={`flex items-center px-3 py-2 text-gray-900 rounded hover:bg-[#00bf00] transition-all duration-200 hover:text-white hover:shadow-inner group border border-transparent dark:text-white dark:hover:border-white dark:hover:text-white group text-[13px] ${
              isTextVisible ? "w-56 h-10" : "w-10 h-10 rounded-full"
            }`}
          >
            <a
              className={`flex items-center w-full h-full transition-opacity duration-500 ease-in-out ${
                showText ? "opacity-100" : "opacity-0"
              }`}
              href="#"
              title={!isTextVisible ? "Recursos" : ""}
            >
              <i className="fa-solid fa-screwdriver-wrench text-[#00bf00] dark:text-white transition-all duration-100 group-hover:text-white"></i>
              {isTextVisible && (
                <span
                  className={`ml-3 text-[#4A494A] group-hover:text-white dark:text-white transition-all duration-200 ease-in-out transform ${
                    isTextVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2 w-0 overflow-hidden"
                  }`}
                >
                  {t("resources")}
                </span>
              )}
            </a>
          </li>
          <li
            className={`flex items-center px-3 py-2 text-gray-900 rounded hover:bg-[#00bf00] transition-all duration-200 hover:text-white hover:shadow-inner group border border-transparent dark:text-white dark:hover:border-white dark:hover:text-white group text-[13px] ${
              isTextVisible ? "w-56 h-10" : "w-10 h-10 rounded-full"
            }`}
          >
            <a
              className={`flex items-center w-full h-full transition-opacity duration-500 ease-in-out ${
                showText ? "opacity-100" : "opacity-0"
              }`}
              href="#"
              title={!isTextVisible ? "Mensajes" : ""}
            >
              <i className="fa-solid fa-envelope text-[#00bf00] dark:text-white transition-all duration-100 group-hover:text-white"></i>
              {isTextVisible && (
                <span
                  className={`ml-3 text-[#4A494A] group-hover:text-white dark:text-white transition-all duration-200 ease-in-out transform ${
                    isTextVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2 w-0 overflow-hidden"
                  }`}
                >
                  {t("message")}
                </span>
              )}
            </a>
          </li>
          <li
            className={`flex items-center px-3 py-2 text-gray-900 rounded hover:bg-[#00bf00] transition-all duration-200 hover:text-white hover:shadow-inner group border border-transparent dark:text-white dark:hover:border-white dark:hover:text-white group text-[13px] ${
              isTextVisible ? "w-56 h-10" : "w-10 h-10 rounded-full"
            }`}
          >
            <a
              className={`flex items-center w-full h-full transition-opacity duration-500 ease-in-out ${
                showText ? "opacity-100" : "opacity-0"
              }`}
              href="#"
              title={!isTextVisible ? "Notificaciones" : ""}
            >
              <i className="fa-solid fa-bell text-[#00bf00] dark:text-white transition-all duration-100 group-hover:text-white"></i>
              {isTextVisible && (
                <span
                  className={`ml-3 text-[#4A494A] group-hover:text-white dark:text-white transition-all duration-200 ease-in-out transform ${
                    isTextVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2 w-0 overflow-hidden"
                  }`}
                >
                  {t("notifications")}
                </span>
              )}
            </a>
          </li>
          <li
            className={`flex items-center px-3 py-2 text-gray-900 rounded hover:bg-[#00bf00] transition-all duration-100 hover:text-white hover:shadow-inner group border border-transparent dark:text-white dark:hover:border-white dark:hover:text-white group text-[13px] ${
              isTextVisible ? "w-56 h-10" : "w-10 h-10 rounded-full"
            }`}
          >
            <a
              className={`flex items-center w-full h-full transition-opacity duration-500 ease-in-out ${
                showText ? "opacity-100" : "opacity-0"
              }`}
              href="#"
              title={!isTextVisible ? "Premium" : ""}
            >
              <i className="fa-solid fa-medal text-[#00bf00] dark:text-white transition-all duration-100 group-hover:text-white"></i>
              {isTextVisible && (
                <span
                  className={`ml-3 text-[#4A494A] group-hover:text-white dark:text-white transition-all duration-200 ease-in-out transform ${
                    isTextVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2 w-0 overflow-hidden"
                  }`}
                >
                  Premium
                </span>
              )}
            </a>
          </li>
          <li
            className={`flex items-center px-3 py-2 text-gray-900 rounded hover:bg-[#00bf00] transition-all duration-100 hover:text-white hover:shadow-inner group border border-transparent dark:text-white dark:hover:border-white dark:hover:text-white group text-[13px] ${
              isTextVisible ? "w-56 h-10" : "w-10 h-10 rounded-full"
            }`}
          >
            <a
              className={`flex items-center w-full h-full transition-opacity duration-500 ease-in-out ${
                showText ? "opacity-100" : "opacity-0"
              }`}
              href="#"
              title={!isTextVisible ? "Cerrar Sesión" : ""}
            >
              <i className="fa-solid fa-right-from-bracket ml-0.5 text-[#00bf00] dark:text-white transition-all duration-100 group-hover:text-white"></i>
              {isTextVisible && (
                <span
                  className={`ml-3 text-[#4A494A] group-hover:text-white dark:text-white transition-all duration-200 ease-in-out transform ${
                    isTextVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2 w-0 overflow-hidden"
                  }`}
                >
                  {t("logout")}
                </span>
              )}
            </a>
          </li>
        </ul>
        <button
          title={!isTextVisible ? t("create") : ""}
          type="button"
          className={`border hover:border-transparent bg-[#00bf00] text-white dark:hover:border-white font-medium rounded transition-all duration-200 ${
            isTextVisible
              ? "w-56 h-auto px-3 py-2 mt-3 text-[13px]"
              : "w-10 h-10 mt-3 flex items-center justify-center text-[10px] rounded-full"
          }`}
        >
          <i className="fa-solid fa-plus"></i>
          {isTextVisible && (
            <span
              className={`ml-2 transition-opacity duration-500 ease-in-out ${
                showText ? "opacity-100" : "opacity-0"
              }`}
            >
              {t("create")}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
