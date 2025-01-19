import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Publications from "./components/Publications";

export default function App() {
  const [isTextVisible, setIsTextVisible] = useState(true);
  const toggleTextVisibility = () => {
    setIsTextVisible((prevState) => !prevState);
  };

  return (
    <>
      <Navbar toggleTextVisibility={toggleTextVisibility} />
      <Sidebar
        isTextVisible={isTextVisible}
        toggleTextVisibility={toggleTextVisibility}
      />
      <Publications />
    </>
  );
}
