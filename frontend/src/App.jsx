import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login-register/login';
import Registrar from './pages/login-register/registrar';
import Perfil from "./pages/Perfil";
import EditarPerfil from "./pages/EditarPerfil";
import Seguidores from "./pages/Seguidores";
import Welcome from './pages/welcome/Welcome';
import Home from './pages/Home/Home';
import Layout from './pages/Layout';
import CommunitySelector from './pages/SelectorComunidad/SelectorComunidad';
import VisorPostComments from './pages/VisorPostComments/VisorPostComments';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Welcome/> } />
        <Route path="*" element={<Layout />}>
          <Route path="home" element={<Home/>} />
          <Route path="posteo" element={<VisorPostComments/>} />
          <Route path="perfil" element={<Perfil/>}>
            <Route path="editar" element={<EditarPerfil/>} />
            {/* <Route path="siguiendo" element={<Seguidores url="siguiendo" titulo="Siguiendo" boton={true} />} />
            <Route path="seguidores" element={<Seguidores url="seguidores" titulo="Seguidores" boton={false} />} /> */}
          </Route>
        </Route>
        <Route path="login" element={<Login/>} />
        <Route path="registrar" element={<Registrar/>} />
        <Route path="comunidades" element={<CommunitySelector/>} />
      </Routes>
    </>
  )
}

export default App;