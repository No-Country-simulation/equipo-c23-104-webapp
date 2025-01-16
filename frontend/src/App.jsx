import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Publications from "./components/Publications";

const App = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Publications />
    </>
  );
};

export default App;
