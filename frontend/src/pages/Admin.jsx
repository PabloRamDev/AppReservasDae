import React, { useState, useEffect, useContext } from 'react';
import {Link as RouterLink} from 'react-router-dom'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper, IconButton, Link } from '@mui/material';
import Grid from '@mui/material/Grid';
import TopBar from '../layout/TopBar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import useAxios from '../utils/useAxios';
import Datatable from '../components/Tabla';
import useAuth from '../hooks/useAuth';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileAppBar from '../layout/AppBar';
import UsuarioForm from '../components/UsuarioForm';
import Alerta from '../components/Alerta';

export default function Home() {

  const [res, setRes] = useState('');
  const [alertaOpen, setAlertaOpen] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [severity, setSeverity] = useState('');

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const { user } = useAuth();

  const api = useAxios();




  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#ededed',
        padding: matches ? 2 : 0,
        paddingLeft: matches ? 2 : 8,
        paddingTop: matches ? 5 : 8,
      }}
    >{
      matches ? <MobileAppBar /> :<TopBar />
    }
      
      <Grid container sx={{ justifyContent: 'center', paddingTop: 3 }}>
        
        <Grid
          item
          xs={12}
          sm={10}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Paper
            sx={{
              height: 'auto',
              width: '100%',
              padding: 2,
              marginTop: 2
            }}
          >
            <Box sx={{marginBottom: 1}}>
                <Typography variant='h5'>Registrar usuario</Typography>
            </Box>
            
            <UsuarioForm setMensaje={setMensaje} setSeverity={setSeverity} setAlertaOpen={setAlertaOpen}/>
          </Paper>
       
        </Grid>
      </Grid>
      <Alerta open={alertaOpen} setOpen={setAlertaOpen} severity={severity}  mensaje={mensaje}/>
    
    </Box>
  );
}
