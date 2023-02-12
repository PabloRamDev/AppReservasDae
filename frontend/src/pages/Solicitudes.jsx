/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  Link, IconButton, Paper
} from '@mui/material';
import Grid from '@mui/material/Grid';
import DataTable from '../components/Tabla';
import { useTheme } from '@mui/material';
import useAxios from '../utils/useAxios';
import Spinner from '../components/Spinner';
import Alerta from '../components/Alerta';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import useMediaQuery from '@mui/material/useMediaQuery';
import useAuth from '../hooks/useAuth';


export default function Solicitudes() {
  const [open, setOpen] = useState(false);
  const [res, setRes] = useState('');
  const [success, setSuccess] = useState(false);
  const [alertaOpen, setAlertaOpen] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [severity, setSeverity] = useState('');
  const {user} = useAuth();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(false);
  

  const api = useAxios();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    
    const fetchSolicitudes = async() => {
      try {
        const response = await api.get('/solicitud')
        

        const eventos = response.data.map((e)=>{
          if (e.estado === 'p'){
            e.estado = 'pendiente'
          }else if (e.estado ==='a'){
            e.estado = 'aprobada' 
          }else if (e.estado ==='r'){
            e.estado ="rechazada"
          }
          
          const dict= {
            id: e.id,
            solicitante: e.solicitante,
            motivo: e.evento,
            inicio: new Date(e.horaIni),
            fin: new Date(e.horaTer),
            estado: e.estado,
            
          }
          return dict;
          
        })
      
        setRes(eventos);
        
      }catch{
        console.log("error")
      }
    }
    fetchSolicitudes();
    setSuccess(false)
  
 
  },[success])


function getNumero(params) {
 
  const filtrado = rows.filter((e) => e.id === params.row.id ) 
  const indice = rows.indexOf(filtrado[0])

  return `${indice + 1}`;
}

  useEffect(() => {
    if (!res) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [res]);

  const handleAceptar = async (params) => {
    
      const response = await api.patch(
        
        '/solicitud/',
        { estado: 'a',
          admin_id: user.user_id,
    
       },
        {
          params: {
            id: params.id,
          },
        },
      ).catch((error) => {
        if (error.response) {
          
          setAlertaOpen(true)
          setMensaje("hubo un error")
          setSeverity("error")
          setSuccess(true)
        }
      });
    
    if(response.status === 200){
      setAlertaOpen(true)
      setMensaje("solicitud aceptada")
      setSeverity("success")
      setSuccess(true)
    }
    
    const post = await api.post(
        
        '/evento/',
        {
              
              title: `${params.solicitante.username}`,
              start: new Date(params.inicio),
              end: new Date(params.fin),
              disabled: 'false',
              description: `${params.motivo}`,
              color: `${params.solicitante.color}`,
              solicitante_id:`${params.solicitante.id}` ,
       },
      ).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        }
      });
    } 

  const handleRechazar = async (params) => {

    const response = await api.patch(
        '/solicitud/',
        { estado: 'r',
        admin_id: user.user_id
       },
        {
          params: {
            id: params.id,
          },
        },
      ).catch((error) => {
        if (error.response) {
          setAlertaOpen(true)
          setMensaje("hubo un error")
          setSeverity("error")
          setSuccess(true)
        }
      });

      if(response.status === 200){
        setAlertaOpen(true)
        setMensaje("solicitud rechazada con éxito")
        setSeverity("success")
        setSuccess(true)
      }
  };

  function getInicioFin(params) {
    const inicio = params.row.inicio.toString().split(" ")
    const final = params.row.fin.toString().split(" ")

    return `${inicio[4]} ${final[4]}`;
  }

  const columns = [
    { 
      field: 'id', 
      headerName: 'id', 
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
      valueGetter: getNumero,
      renderCell: (params) => (

        <Link
          variant="body"
          component={RouterLink}
          to={`/solicitudes/${params.id}`}
          color="primary"
          underline="none"
          fontWeight={700}
        >
          {params.value}
        </Link>

      ) },
    {
      field: 'solicitante',
      headerName: 'Solicitante',
      flex: 2,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (

        <Link
          variant="body"
          component={RouterLink}
          to={`/estudiantes/${params.value.id}`}
          color="primary"
          underline="none"
          fontWeight={700}
        >
          {params.value.email}
        </Link>

      )

    },
    {
      field: 'motivo',
      headerName: 'Motivo',
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
      field: 'estado',
      headerName:'Estado',
      flex: 1,
      alignItems: 'center',
      align: 'center',
      headerAlign: 'center',
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
          {params.row.estado === 'pendiente' ?<IconButton color="success" aria-label="Aceptar" onClick={()=> handleAceptar(params.row)}>
            <CheckCircleIcon />
          </IconButton> : <IconButton color="success"  disabled= {true} aria-label="Aceptar" onClick={()=> handleAceptar(params.row)}>
            <CheckCircleIcon />
          </IconButton>}
          {params.row.estado === 'pendiente' ? <IconButton color="primary" aria-label="Rechazar"  onClick={()=> handleRechazar(params.row)}>
            <CancelIcon />
          </IconButton>:
          <IconButton color="primary" aria-label="Rechazar" disabled={true} onClick={()=> handleRechazar(params.row)}>
            <CancelIcon />
          </IconButton>}
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
                padding: 1,
                marginTop: 3,
              }}
            >
              <Box
                sx={{ mx: 1, display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography variant="h5">Solicitudes</Typography>
              </Box>
              {res ? <DataTable columns={columns} rows={rows} /> : null }
            </Paper>
          </Grid>
        </Grid>
        
      )}
       <Alerta open={alertaOpen} setOpen={setAlertaOpen} severity={severity}  mensaje={mensaje}/>
    </Box>

  );
}
