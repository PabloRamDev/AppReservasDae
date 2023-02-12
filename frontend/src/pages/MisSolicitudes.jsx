/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import {Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import {
  Link, IconButton, Paper, useTheme
} from '@mui/material';
import Grid from '@mui/material/Grid';
import DataTable from '../components/Tabla';
import TopBar from '../layout/TopBar';
import SoliForm from '../components/SoliForm';
// import LoginForm from '../components/NuevaFact';
import useAxios from '../utils/useAxios';
import AuthContext from '../context/AuthContext';
import Spinner from '../components/Spinner';
import Alerta from '../components/Alerta';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileAppBar from '../layout/AppBar';
import ModalReglas from '../components/ModalReglas';




export default function MisSolicitudes() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alertaOpen, setAlertaOpen] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [severity, setSeverity] = useState('');
  const [res, setRes] = useState('');
  const {user} = useContext(AuthContext);

  const api = useAxios();

  const handleOpen = () => {
    setModalopen(true);
    // setOpen(true);
  };
  const handleModalclose = () => {
    setModalopen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleModal = ()=>{
    setModalopen(false)
  }

  useEffect(()=>{
    setLoading(true);
    const fetchSolicitudes = async() => {
     
        const response = await api.get('/solicitante',{
          params:{id: user.user_id}
        }).catch(error => 
          error.response.status)
        

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
            solicitante: `${e.solicitante.email}`,
            motivo: e.evento,
            inicio: new Date(e.horaIni),
            fin: new Date(e.horaTer),
            estado: e.estado
          }
          return dict;
          
        })
        setRes(eventos);
        setLoading(false);
    }
    fetchSolicitudes();
    setSuccess(false)
   
    
  },[success])


  const handleAceptar = async (params) => {
    
      await api.patch(
        
        '/solicitud/',
        { estado: 'a',
          admin_id: user.user_id
       },
        {
          params: {
            id: params.id,
          },
        },
      ).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        }
      });
   
      await api.post(
        
        '/evento/',
        {
              solicitante: user.user_id,
              title: `${params.solicitante}`,
              start: new Date(params.inicio),
              end: new Date(params.fin),
              disabled: 'false',
              description: `${params.motivo}`
       },
      ).catch(error => 
        error.response.status
      )
  };
  const handleRechazar = async (params) => {

   
      await api.patch(
        '/solicitud/',
        { estado: 'r',
        admin_id: user.user_id
       },
        {
          params: {
            id: params.id,
          },
        },
      ).then(

      ).catch(error => 
        error.response.status
      );
   
  };

  function getInicioFin(params) {
    
    const inicio = params.row.inicio.toString().split(" ")
    const final = params.row.fin.toString().split(" ")

    return `${inicio[4]} ${final[4]}`;
  }

  function getNumero(params) {
 
    const filtrado = rows.filter((e) => e.id === params.row.id ) 
    const indice = rows.indexOf(filtrado[0])
  
    return `${indice + 1}`;
  }


  const columns = [
    { 
      field: 'id', 
      headerName: 'id', 
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      valueGetter: getNumero,
      renderCell: (params) => (

        <Link
          variant="body"
          component={RouterLink}
          to={`/missolicitudes/${params.id}`}
          color="primary"
          underline="none"
          fontWeight={700}
        >
          Solicitud n° {params.value}
        </Link>

      ) },
    
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
      paddingLeft: matches ? 8 : 0,
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
                width: '100%',
                padding: 2,
                marginTop: 3,
              }}
            >
              <Box
                sx={{ mx: 2, display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography variant="h5">Mis solicitudes</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  endIcon={<AddCircleOutlineIcon />}
                  onClick={handleOpen}
                >
                  Nueva
                </Button>
              </Box>
              <DataTable columns={columns} rows={rows} isLoading={loading} />
            </Paper>
          </Grid>
        </Grid>
      
      <ModalReglas open={modalOpen} setOpen={setOpen} handleModal={handleModal} />
      <SoliForm open={open} handleModal={handleModal} handleClose={handleClose} setMensaje={setMensaje} setSeverity={setSeverity} setSuccess={setSuccess} loading={loading} setLoading={setLoading} setAlertaOpen={setAlertaOpen} /> 
      <Alerta open={alertaOpen} setOpen={setAlertaOpen} severity={severity}  mensaje={mensaje}/>

    </Box>

  );
}
