import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RutaPrivada from "./utils/rutaPrivada";
import RutaPrivadaDae from "./utils/rutaPrivadaDae";
import RutaPrivadaInfo from './utils/rutaPrivadaInfo';
import "@fontsource/oswald";
import RutaPrivadaAl from "./utils/rutaPrivadaAl";
import LoginPage from "./pages/LoginPage";
import Agenda from "./pages/Agenda";
import Home from "./pages/Home";
import Solicitudes from "./pages/Solicitudes";
import MisSolicitudes from "./pages/MisSolicitudes";
import Solicitud from "./pages/Solicitud";
import MiPerfil from './pages/MiPerfil';
import Usuario from "./pages/Usuario";
import Admin from "./pages/Admin";
import Usuarios from './pages/Usuarios';
import MisInvitaciones from './pages/MisInvitaciones';
import Banners from './pages/Banners.jsx';




function App() {


 
  const theme1 = createTheme({
    palette: {
      primary: {
        light: "#cc1111",
        main: "#990000",
        dark: "#990012",
        contrastText: "#fff",
      },  
      secondary: {
        light: "#fff",
        main: "#d4d4d4",
        dark: "#dadada",
        contrastText: "#990000",
      },
     
    },
    zIndex: {
      appBar: 1250,
    },
    typography: {
      fontFamily: "oswald",
    },
    paper : {
      backgroundColor: "#000"
    }
  });

  return (
 
        <ThemeProvider theme={theme1}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"es"}>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                
                <Route element={<RutaPrivada />}>
                <Route index element={<Home />} />
    
                  <Route element={<RutaPrivadaDae />}>
                  
                        
                        <Route path="agenda/" element={<Agenda />} />
                        <Route path="solicitudes/" element={<Solicitudes />} />
                        <Route path="/solicitudes/:id" element={<Solicitud />} />
                        <Route path="/estudiantes" element={<Usuarios />} />
                        <Route path="/estudiantes/:id" element={<Usuario />} />
                        <Route path="/miperfil/:id" element={<MiPerfil />} />
                        <Route path="/banners/" element={<Banners/>} />
                    </Route>
                  <Route element={<RutaPrivadaAl />}>
                  
                    <Route
                      path="missolicitudes/"
                      element={<MisSolicitudes />}
                    />
                      <Route
                        path="misinvitaciones/"
                        element={<MisInvitaciones />}
                    />
                    <Route path="/missolicitudes/:id" element={<Solicitud />} />
                  </Route>
                  <Route element={<RutaPrivadaInfo />}>
                    <Route path="/registrar" element={<Admin/>}/>
                    <Route path="/usuarios" element={<Usuarios />} />
                    <Route path="/usuarios/:id" element={<Usuario />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </LocalizationProvider>
        </ThemeProvider>

  );
}

export default App;
