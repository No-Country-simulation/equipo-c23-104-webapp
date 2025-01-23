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
          <Route path="siguiendo" element={<Seguidores url={"siguiendo"} titulo={"Siguiendo"} boton={true} />} />
          <Route path="seguidores" element={<Seguidores url={"seguidores"} titulo={"Seguidores"} boton={false} />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;