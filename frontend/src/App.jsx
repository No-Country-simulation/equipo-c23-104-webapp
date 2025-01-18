import Perfil from "./pages/Perfil";
import EditarPerfil from "./pages/EditarPerfil";
import { Routes, Route } from "react-router-dom";
import Seguidores from "./pages/Seguidores";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Perfil />}>
          <Route path="editar-perfil" element={<EditarPerfil />} />
          <Route path="seguidos" element={<Seguidores titulo={"Seguidos"} boton={false} />} />
          <Route path="seguidores" element={<Seguidores titulo={"Seguidores"} boton={true} />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;