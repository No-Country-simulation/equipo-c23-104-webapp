import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Publications from "./components/Publications";
import "./i18n";
import { useTranslation } from "react-i18next";

export default function App() {
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { t, i18n } = useTranslation();

  const toggleTextVisibility = () => {
    setIsTextVisible((prevState) => !prevState);
  };

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <Navbar
        toggleTextVisibility={toggleTextVisibility}
        setSearchQuery={setSearchQuery}
        handleChangeLanguage={handleChangeLanguage}
      />
      <Sidebar
        isTextVisible={isTextVisible}
        toggleTextVisibility={toggleTextVisibility}
        handleChangeLanguage={handleChangeLanguage}
      />
      <Publications searchQuery={searchQuery} />
    </>
  );
}
