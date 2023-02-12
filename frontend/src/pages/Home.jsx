import React, { useState, useEffect, useContext } from 'react';
import {Link as RouterLink} from 'react-router-dom'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper, IconButton, Link, Stack, List, ListItem } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2.js';
import useAxios from '../utils/useAxios';
import useAuth from '../hooks/useAuth';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import dayjs from 'dayjs';
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import EstadoCanchaCard from '../components/EstadoCanchaCard.jsx';
import ProximosCard from '../components/ProximosCard';
import Carrusel from '../components/Carrusel.jsx';


export default function Home() {

  dayjs.extend(isBetween);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);

  const [res, setRes] = useState('');
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actual, setActual] = useState();
  const [banners, setBanners] = useState([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));


  const { user } = useAuth();

  const api = useAxios();

  useEffect(()=>{
    const ahora = dayjs().add(-1,'hour').format('YYYY-MM-DD HH:mm')
    const semana = dayjs().add(7,'day').format(('YYYY-MM-DD HH:mm'))

    
    setLoading(true);
    const getBanners= async ()=>{
      const response = await api.get('/crearbanner/');
      try {
          if (response.status === 200){
              setBanners(response.data)
          }
      } catch (error) {
          console.log(error.message)   
      }
  }
 

    const fetchEventos = async() => {
      

      const response = await api.get('/geteventos/',{
        params: {
          'start__gte':ahora,
          'end__lte': semana
        }
      })
      if(response.status === 200){
        setRes(response.data)
      }
      
      const eventos = response.data.map((e)=>{
        const dict= {
          id: e.event_id,
          evento: e.title,
          inicio: new Date(e.start),
          fin: new Date(e.end),
          anfitrion: e.solicitante.email
        }
        if(dayjs().isAfter(dayjs(e.start))){
          if(dayjs().isBefore(dayjs(e.end))){
            setActual(dict)
          }else{
            setActual("No hay eventos en este momento")
          }
         
        }
        return dict;
        })
        setLoading(false)
      setEventos(eventos);
    
  }

    fetchEventos();
    getBanners()
    
  },[])


  return (
  <Box sx={{ justifyContent: 'space-around', minHeight: '100vh',
  backgroundColor: '#ededed',
  padding: matches ? 0 : 2,
  paddingLeft: matches ? 2 : 8,
  paddingTop: matches ? 10 : 10, }}>
      
      <Grid2 container spacing={2} sx={{width: '100%', justifyContent: 'center', height: 'auto', display: 'flex'}}>
      <Grid2
            xs={12}
            md={11}
            >
{banners? <Carrusel banners={banners}/> : null }


</Grid2>
     
          <Grid2

          xs={12}
          md={5}
          sx={{
           
      
          }}
        >
          <EstadoCanchaCard evento={actual} loading={loading}/>
          
        </Grid2>
        <Grid2

          xs={12}
          md={6}
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
              minHeight: 250,
            }}
          >
            <Box>
            <Box sx={{backgroundColor:'#b22834', color:'#fff', display:'flex', padding:1, justifyContent:'center', borderRadius: 2, borderBottomLeftRadius:0,borderBottomRightRadius:0}}>
        <Typography  sx={{marginRight: 1}}>Próximos eventos</Typography>
      </Box>
     
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 'auto'}}>
      <List sx={{maxHeight: '250px', overflow: 'auto', width: '100%'}}>
              {eventos && eventos.length > 0 ? eventos.map(e =>
              
              <ListItem key={e.id} sx={{width: '100%'}}>
                  <ProximosCard  evento={e} loading={loading} />
                  </ListItem>
                  
            
              ): <Typography key="sineventos" variant="h4" textAlign="center" color="secondary">Sin eventos</Typography>}
            
            </List>
            </Box>
            </Box>
        
            
          </Paper>

        </Grid2>
      </Grid2>
      </Box>
  
  );
}
