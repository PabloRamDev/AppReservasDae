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
import Alerta from '../components/Alerta';


export default function MisInvitaciones() {

  const [res, setRes] = useState('')
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alertaOpen, setAlertaOpen] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [severity, setSeverity] = useState('');
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const { user } = useAuth();

  const api = useAxios();

  useEffect(()=>{
    const fetchInvitaciones = async() => {
        setLoading(true);
        const response = await api.get('/getmisinvis/',{
          params: {'id':user.user_id}
        })
        
        const invitaciones = response.data.map((e)=>{
        
        
          const dict= {
            id: e.id,
            evento: e.solicitud.evento,
            solicitante: e.solicitud.solicitante.username,
            inicio: new Date(e.solicitud.horaIni),
            fin: new Date(e.solicitud.horaTer),
            estado: e.estado
          }
          return dict;
          
          })
        setRes(invitaciones);
        setLoading(false)
        setSuccess(false)
        console.log(response.data)
      
    }
   
    fetchInvitaciones();
    
  },[success])

  function getInicioFin(params) {
    const inicio = params.row.inicio.toString().split(" ")
    const final = params.row.fin.toString().split(" ")

    return `${inicio[4]} ${final[4]}`;
  }

  function getPendiente(params) {
   if(params.row.estado === 'p'){
    return "Pendiente"
   }else if(params.row.estado === 'a'){
    return "Aceptada"
   }else{
    return "Rechazada"
   }
  }

  const handleAceptar = async (params) => {
    
      const response = await api.patch(
        
        '/invitacion/',
        { estado: 'a',
       },
        {
          params: {
            id: params.id,
          },
        },
      ).catch(error => 
        error.response
      );

      if(response.status === 200){
        setSuccess(true);
        setAlertaOpen(true);
        setMensaje("Invitación aceptada con éxito");
        setSeverity("success");
      }
    
    
  };
  const handleRechazar = async (params) => {

    
      const response = await api.patch(
        '/invitacion/',
        { estado: 'r',
       },
        {
          params: {
            id: params.id,
          },
        },
      ).catch(error => 
        error.response
      );
      if(response.status === 200){
        setSuccess(true);
        setAlertaOpen(true);
        setMensaje("Invitación rechazada");
        setSeverity("success");
      }

  };
  const handleEliminar = async (params) => {

    const response = await api.delete(
      '/invitacion/',
      {
        params: {
          id: params.id,
        },
      },
    ).then(
      setSuccess(true)
    ).catch(error => 
      error.response
    );

    setSuccess(true);
    setAlertaOpen(true);
    setMensaje("Invitación eliminada");
    setSeverity("success");

};

function getNumero(params) {
 
    const filtrado = rows.filter((e) => e.id === params.row.id ) 
    const indice = rows.indexOf(filtrado[0])
  
    return `${indice + 1}`;
  }

 

  const columns = [
    { 
      field: 'id', 
      headerName: 'id', 
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
      valueGetter: getNumero,
     },

    {
      field: 'solicitante',
      headerName: 'Solicitante',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'estado',
      headerName: 'Estado',
      type: 'string',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      valueGetter: getPendiente,
      renderCell: (params)=>{
        let color = ""
        params.row.estado === 'a' ? color = "#00ba35" : color = '#000'

        return (<Box sx={{display:"flex",flexDirection:"column", backgroundColor:{color}}}>
            <Typography  sx={{fontSize:12}}>{params.value}</Typography>
           
        </Box>)
        
      }
  // 
    },{
      field: 'evento',
      headerName: 'evento',
      type: 'string',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'inicio',
      headerName: 'fecha',
      type: 'date',
      flex: 1,
      alignItems: 'center',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'fin',
      headerName: 'inicio - fin',
      type: 'dateTime',
      flex: 1,
      alignItems: 'center',
      align: 'center',
      headerAlign: 'center',
      valueGetter: getInicioFin,
      renderCell: (params)=>{
        const text = params.value.split(" ");
        return (<Box sx={{display:"flex",flexDirection:"column"}}>
            <Typography  sx={{fontSize:12}}>{text[0]}</Typography>
            <Typography sx={{fontSize:12}}>{text[1]}</Typography>
        </Box>)
        
      }
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      flex: 1,
      alignItems: 'center',
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        
        <Box sx={{ display: 'flex', mx: 'auto' }}>
          <IconButton color="success" aria-label="Aceptar" onClick={()=> handleAceptar(params.row)}>
            <CheckCircleIcon />
          </IconButton> 
        
          <IconButton color="warning" aria-label="Rechazar"  onClick={()=> handleRechazar(params.row)}>
            <CancelIcon />
          </IconButton>

          <IconButton color="error" aria-label="Eliminar"  onClick={()=> handleEliminar(params.row)}>
            <CancelIcon />
          </IconButton>
          
        </Box>

      ),

    },
  ];

  let rows = [];
  if (res) {
    rows = res;
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
    >
      
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
              padding: 0,
              marginTop: 2
            }}
          >            
          </Paper>
       
        </Grid>
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
              padding: 0,
              marginTop: 2
            }}
          >

            <Typography variant={'h5'} sx={{marginLeft: 2, marginTop: 2}}> Mis invitaciones</Typography>
            {user.tipo === 'a' ? <Datatable columns={columns} rows={rows} isLoading={loading} /> : null}
            
          </Paper>
       
        </Grid>
      </Grid>
      <Alerta open={alertaOpen} setOpen={setAlertaOpen} severity={severity}  mensaje={mensaje}/>
    
    </Box>
  );
}
