
import { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import { Paper, Box, Typography, Avatar, Button, useTheme, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import TopBar from '../layout/TopBar';
import useAxios from '../utils/useAxios';
import Spinner from '../components/Spinner';
import Alerta from '../components/Alerta';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileAppBar from '../layout/AppBar';
import useAuth from '../hooks/useAuth';


function Usuario() {
  const {id} = useParams(); 
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [res, setRes] = useState('');
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(false);



  const api = useAxios();

  const obtenerIniciales = (nombre) =>{
    let separado = nombre.split(" ");
    if(separado.length > 1){
      let iniNombre = separado[0].slice(0,1)
      let iniApe = separado[1].slice(0,1)
      let iniciales = iniNombre + iniApe
      
      return iniciales.toUpperCase()
    }else{
      let iniNombre = separado[0].slice(0,1)
      return iniNombre.toUpperCase()

    }
   
   
  }

 
  useEffect(() => {
    setLoading(true)
    const fetchUsuario = async ()=>{
        try {
        const response = await api.get(`/getsingleuser/?id=${id}`)
        console.log()
        if(response.status === 200){
          setRes(response.data) 
          setLoading(false)

        }
        
        } catch{
            setRes('algo salió mal')
        }

    }
    fetchUsuario()
   
  }, [id]);

  const handleSubmit = async (data)=>{
      await api.patch('/patchusuario/', data)
  }

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
      {loading ? <Spinner /> : (
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
                width: '100%',
                padding: 2,
                marginTop: 3,
              }}
            >
              {res ?
              <Box sx={{ mx: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center'  }}>
                <Box sx={{display: 'flex',flexDirection: 'column', alignItems: 'center'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <Avatar sx={{backgroundColor: res[0].color, marginRight: 1}}>{obtenerIniciales(res[0].username)}</Avatar>
                  
                  <Typography variant="h4">{res[0].username}</Typography> 
                  </Box>
                  <Typography variant="body1">{res[0].email}</Typography>
                  <Typography variant="body2">{res[0].tipo === 'a' ? 'estudiante' : null }</Typography>
                  </Box>
                  <Box>
                    
                    {res[0].is_active === true ? <Button onClick={()=>handleSubmit({pk: res[0].id, is_active: false})} variant='contained'>Desactivar</Button> : <Button onClick={()=>handleSubmit({pk: res[0].id, is_active: true})}  color='success'variant='contained'>Activar</Button>}
                  </Box>
             </Box>
              
              : null }
              
            </Paper>
            </Grid>
            {user.tipo === 'd' ?
                 
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
                        width: '100%',
                        padding: 2,
                        marginTop: 3,
                        display: 'flex',
                        justifyContent: 'center'
                      }}
                    >
                      
                      <Box sx={{width: '50%', display:'flex',flexDirection: 'column', alignItems:'center', justifyContent: 'center'}}>
                      <Typography variant='h5'> Reiniciar Contraseña </Typography>
                      <TextField
                  margin="dense"
                  
                  fullWidth
                  id="email"
                  label="Nueva Contraseña"
                  type="password"
                  variant="outlined"
                  color="primary"
            
                />
                <TextField
                  margin="dense"
                  id="password"
                  fullWidth
                  label="Repetir Contraseña"
                  type="password"
                  variant="outlined"
                  color="primary"
                
                />
        
                <Button variant="contained" color="primary" sx={{ marginTop: 2, width: '100px' }} type="submit">Aceptar</Button>
                </Box>
                      </Paper>
                      
                      </Grid>
                  
              
                : null  
          }
  
  </Grid>)}

    </Box>

  );
}

export default Usuario;