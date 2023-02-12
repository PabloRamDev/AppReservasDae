/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  Link, Paper
} from '@mui/material';
import Grid from '@mui/material/Grid';
import DataTable from '../components/Tabla';
import TopBar from '../layout/TopBar';
import { useTheme } from '@mui/material';
import useAxios from '../utils/useAxios';
import Spinner from '../components/Spinner';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileAppBar from '../layout/AppBar';
import useAuth from '../hooks/useAuth';



export default function Usuarios() {
  const [open, setOpen] = useState(false);
  const [res, setRes] = useState('');
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
    
    const fetchEstudiantes = async() => {
      try {
        const response = await api.get('/getestudiantes')
        
        setRes(response.data);
        
      }catch{
        console.log("error")
      }
    }
    fetchEstudiantes();
  
 
  },[])


function getNumero(params) {
 
  const filtrado = rows.filter((e) => e.id === params.row.id ) 
  const indice = rows.indexOf(filtrado[0])

  return `${indice + 1}`;
}


function getEstado(params) {
 
    if(params.row.is_active === true){
        return 'activo'
    }else{
        return 'inactivo'
    }
  }

  useEffect(() => {
    if (!res) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [res]);

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
      field: 'email',
      headerName: 'email',
      flex: 2,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (

        <Link
          variant="body"
          component={RouterLink}
          to={`/estudiantes/${params.id}`}
          color="primary"
          underline="none"
          fontWeight={700}
        >
          {params.value}
        </Link>
      )
    },
    {
      field: 'username',
      headerName: 'Nombre de Usuario',
      type: 'string',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'is_active',
      headerName:'Estado',
      flex: 1,
      alignItems: 'center',
      align: 'center',
      headerAlign: 'center',
      valueGetter: getEstado
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
                <Typography variant="h5">Usuarios</Typography>
              </Box>
              {res ? <DataTable columns={columns} rows={rows} /> : null }
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>

  );
}
