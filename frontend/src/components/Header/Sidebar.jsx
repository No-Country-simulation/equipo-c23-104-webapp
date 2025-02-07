import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Sidebar({ isTextVisible, showText }) {
const { t } = useTranslation();

return (
<>
<aside
id="logo-sidebar"
className={`fixed top-0 left-0 z-40 h-screen rounded pt-20 bg-white sm:translate-x-0 dark:bg-[#4A494A] dark:border-gray-700 transition-all duration-500 border border ${
  isTextVisible ? "w-64" : "w-16"
} hidden sm:block`}
aria-label="Sidebar"
>
<div className="h-full px-3 pb-4 pt-3 overflow-y-auto bg-white dark:bg-[#4A494A] mt-4 transition-all duration-500">
  <ul className="space-y-0 font-medium">
    {[
      { icon: "fa-house", label: t("home"), to: "/home" },
      { icon: "fa-users", label: t("community"), to: "/comunidades" },
      // { icon: "fa-bell", label: t("notifications") },
      // { icon: "fa-right-from-bracket", label: t("logout") },
    ].map((item, index) => (
      <li
        key={index}
        className={`flex items-center px-3 py-2 text-gray-900 rounded hover:bg-lime-600 transition-all duration-100 hover:text-white hover:shadow-inner group border border-transparent dark:text-white dark:hover:border-white dark:hover:text-white group text-[13px] ${
          isTextVisible ? "w-56 h-10" : "w-10 h-10 rounded-full"
        }`}
      >
        <Link
          className={`flex items-center w-full h-full transition-opacity duration-500 ease-in-out ${
            showText ? "opacity-100" : "opacity-0"
          }`}
          to={item.to}
        >
          <i
            className={`fa-solid ${item.icon} text-lime-600 dark:text-white transition-all duration-100 group-hover:text-white`}
          ></i>
          {isTextVisible && (
            <span
              className={`ml-3 text-[#4A494A] group-hover:text-white dark:text-white transition-all duration-200 ease-in-out transform ${
                isTextVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-2 w-0 overflow-hidden"
              }`}
            >
              {item.label}
            </span>
          )}
        </Link>
      </li>
    ))}
  </ul>
  <button
    title={!isTextVisible ? t("create") : ""}
    type="button"
    className={`border hover:border-transparent bg-lime-600 text-white dark:hover:border-white font-medium rounded transition-all duration-200 mt-3 ${
      isTextVisible
        ? "w-56 h-auto px-3 py-2 text-[14px]"
        : "w-10 h-10 flex items-center justify-center text-[10px] rounded-full"
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
<nav className="fixed bottom-0 left-0 w-full bg-white border-t border dark:bg-[#4A494A] dark:border-gray-700 flex justify-around py-2 sm:hidden">
{[
  { icon: "fa-house", label: t("home"), to: "/home" },
  { icon: "fa-users", label: t("community"), to: "/comunidades" },
  // { icon: "fa-bell", label: t("notifications") },
  { icon: "fa-right-from-bracket", label: t("logout") },
].map((item, index) => (
  <Link
    key={index}
    to={item.to}
    className="flex flex-col items-center text-gray-900 dark:text-white transition-all duration-200 hover:text-lime-600"
  >
    <i className={`fa-solid ${item.icon} text-lg`}></i>
    <span className="text-[10px]">{item.label}</span>
  </Link>
))}
<button
  title={t("create")}
  type="button"
  className="bg-lime-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
>
  <i className="fa-solid fa-plus text-[13px]"></i>
</button>
</nav>
</>
);
}
