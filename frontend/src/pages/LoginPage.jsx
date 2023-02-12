import React, {useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Typography, Paper } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Login from '../components/Login';
import wallpaper from '../assets/wlpper.jpg'
import logo from '../assets/LogoInacap.png'
import CircularProgress from '@mui/material/CircularProgress';
import Alerta from '../components/Alerta';
import Footer from '../layout/Footer.jsx';



function LoginPage() {

  const [loading, setLoading ] = useState(false)
  const [open, setOpen] = useState(false)
  const [mensaje, setMensaje] = useState('')

  return (
    

      <Box padding={0} sx={{ height: '92vh'}}>
        <Grid2
          container
          sx={{
            height: '100%',
            width: '100%',  
          
          }}
        >
          <Grid2
            
            sx={{
              display: {xs: 'none', md:'flex'},
              justifyContent: 'center',
              alignItems: 'center',
              backgroundSize: 'cover',
              backgroundImage: `url(${wallpaper})`,
            }}
            xs={12}
            sm={7}
          >
            
            <Typography variant="h2" align="center" color="white" fontWeight={700}>
              Agenda de Espacios Comunes
            </Typography>
          </Grid2>
          <Grid2
            
            xs={12}
            md={5}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              
            }}
          >
            <Box sx={{justifyContent:'start', display:'flex'}}>
           <img src={logo} style={{width: '150px', marginBottom: 50}} alt="logo-Inacap"/>
           </Box>
     <Typography variant="h5" align="center" color="black" fontWeight={700} marginBottom={4}>
              Inicia Sesión Agenda DAE
            </Typography>
          
            <Login setLoading={setLoading} setOpen={setOpen} setMensaje={setMensaje} loading={loading} />
            <Box sx={{height: '60px', padding: 2}}>
            {loading ?
              <CircularProgress />
           : null }
            </Box> 
           
            
          </Grid2>  
        </Grid2>
        
        <Alerta open={open} setOpen={setOpen} severity={'error'}  mensaje={mensaje}/>
        <Footer/>
      </Box>
    
  );
}

export default LoginPage;
