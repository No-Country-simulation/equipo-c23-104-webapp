import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Publications from "./components/Publications";
import "./i18n";
import { useTranslation } from "react-i18next";

export default function App() {
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showText, setShowText] = useState(true);
  const { t, i18n } = useTranslation();

  const toggleTextVisibility = () => {
    setIsTextVisible((prevState) => !prevState);
  };

  const handleChangeLanguage = (lang) => {
    setShowText(false);
    setTimeout(() => {
      i18n.changeLanguage(lang);
      setShowText(true);
    }, 300);
  };

  return (
    <>
      <Navbar
        toggleTextVisibility={toggleTextVisibility}
        setSearchQuery={setSearchQuery}
        handleChangeLanguage={handleChangeLanguage}
        showText={showText}
      />
      <Sidebar
        isTextVisible={isTextVisible}
        toggleTextVisibility={toggleTextVisibility}
        showText={showText}
      />
      <Publications searchQuery={searchQuery} showText={showText} />
    </>
  );
}
