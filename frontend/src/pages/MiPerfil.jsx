import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  Box,
  Typography,
  Avatar,
  Button,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import TopBar from "../layout/TopBar";
import useAxios from "../utils/useAxios";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileAppBar from "../layout/AppBar";
import { HexColorPicker } from "react-colorful";
import useAuth from "../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";
import ColorStepper from "../components/ColorStepper";
import Alerta from "../components/Alerta";

function MiPerfil() {
  const { id } = useParams();
  const [res, setRes] = useState("");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [color, setColor] = useState("#aabbcc");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertaOpen, setAlertaOpen] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [severity, setSeverity] = useState('');
  const { user } = useAuth();

  const api = useAxios();

  const obtenerIniciales = (nombre) => {
    let separado = nombre.split(" ");
    let iniNombre = separado[0].slice(0, 1);
    let iniApe = separado[1].slice(0, 1);
    let iniciales = iniNombre + iniApe;
    return iniciales.toUpperCase();
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await api.get(`/getsingleuser/?id=${id}`);
        console.log();
        if(response.status === 200){
          setRes(response.data);
       
        }
        
      } catch {
        setRes("algo salió mal");
      }
    };
    fetchUsuario();
    
    setSuccess(false);
  }, [success]);

  const handleSubmit = async () => {
    setLoading(true)
    const response = await api.patch(
      "/patchusuario/", 
      { pk: id, color: color }
      ).catch((error) => {
        if (error.response) {
          setAlertaOpen(true)
          setMensaje("hubo un error")
          setSeverity("error")
          setSuccess(true)
          setLoading(false)
        }
      });
      if(response.status === 200){
        setLoading(false)
        setAlertaOpen(true)
          setMensaje("Color cambiado con éxito")
          setSeverity("success")
          setSuccess(true)
          

      }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#ededed",
        padding: matches ? 2 : 0,
        paddingLeft: matches ? 2 : 8,
        paddingTop: matches ? 5 : 8,
      }}
    >
      {matches ? <MobileAppBar /> : <TopBar />}

      <Grid container sx={{ justifyContent: "center", paddingTop: 3 }}>
     
        <Grid
          item
          xs={12}
          sm={10}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
           <Paper
            sx={{
              width: "100%",
              padding: 2,
              marginTop: 3,
              marginBottom: -1,
              display:'flex',
              textAlign: 'center',
              justifyContent: 'center',
              elevation: 0,
            }}
          >
        
            {!res ? <Box sx={{display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center'}}><CircularProgress /></Box> : (
              
              <Box sx={{ mx: 2, display: "flex", justifyContent: "start" }}>
                
                <Box sx={{ display: "flex", flexDirection: "column", textAlign: 'center' }}>
                  <Box sx={{ display: "flex", alignItems: "center", textAlign: 'center' }}>
                    <Avatar
                      sx={{ backgroundColor: res[0].color, marginRight: 1 }}
                    >
                      {obtenerIniciales(res[0].username)}
                    </Avatar>

                    <Typography variant="h4">{res[0].username}</Typography>
                  </Box>
                  <Typography variant="body1">{res[0].email}</Typography>
                  
                </Box>
              
              </Box>
              
                  
            )}
            </Paper>
          
        </Grid>
        <Grid
          item
          xs={12}
          sm={10}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper  sx={{
              width: "100%",
              padding: 2,
              display:'flex',
              textAlign: 'center',
              justifyContent: 'center',
              elevation: 0,
            }}>
          <Box sx={{width: '100%'}}>
                    <ColorStepper />
                    <Box sx={{display:'flex', flexDirection:'column', alignItems: 'center', marginY: 2}}>
                    <Typography variant="h5">Personalizar Color</Typography>
                    
                    <HexColorPicker color={color} onChange={setColor} />
                    <Box sx={{height: '40px'}}>
{loading ? <CircularProgress /> : null}
                    </Box>
                    <Button variant='contained' sx={{backgroundColor: color}} onClick={handleSubmit}> Confirmar </Button>
                    </Box>
                    </Box>
                    </Paper>
                   
        </Grid>
      
      </Grid>
      <Alerta open={alertaOpen} setOpen={setAlertaOpen} severity={severity}  mensaje={mensaje}/>

    </Box>
  );
}

export default MiPerfil;
