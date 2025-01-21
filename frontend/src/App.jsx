import Perfil from "./pages/Perfil";
import EditarPerfil from "./pages/EditarPerfil";
import Post from "./components/Post";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Perfil />}>
          <Route path="editar-perfil" element={<EditarPerfil />} />

        </Route>
      </Routes>
    </>
  )
}

export default App;