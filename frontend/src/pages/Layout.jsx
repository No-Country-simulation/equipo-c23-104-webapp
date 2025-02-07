import { useState, useEffect, useContext } from "react";
import Navbar from '../components/Header/Navbar';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Header/Sidebar';
import "../../src/i18n";
import { useTranslation } from "react-i18next";


const Layout = () => {
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
            <Outlet />
        </>
    );
};

export default Layout;