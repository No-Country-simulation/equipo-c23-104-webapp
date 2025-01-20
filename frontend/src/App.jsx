import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Publications from "./components/Publications";

export default function App() {
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const toggleTextVisibility = () => {
    setIsTextVisible((prevState) => !prevState);
  };

  return (
    <>
      <Navbar
        toggleTextVisibility={toggleTextVisibility}
        setSearchQuery={setSearchQuery}
      />
      <Sidebar
        isTextVisible={isTextVisible}
        toggleTextVisibility={toggleTextVisibility}
      />
      <Publications searchQuery={searchQuery} />
    </>
  );
}
