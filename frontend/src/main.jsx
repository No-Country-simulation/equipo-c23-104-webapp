import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import PerfilContextoProvider from './context/PerfilContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PerfilContextoProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PerfilContextoProvider>
  </StrictMode>,
)
