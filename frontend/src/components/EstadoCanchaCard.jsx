import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import cancha from '../assets/cancha.png'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import dayjs from 'dayjs';
import { CircularProgress } from '@mui/material';

export default function EstadoCanchaCard({evento, loading}) {

  const parseHora = (hora)=>{
    if(hora){
      return   dayjs(hora).locale("es")
      .format("ddd D MMM HH:mm")
    }
    else{
      return "Sin eventos"
    }


  }


  return (
    <Card sx={{ display: 'flex', minHeight: 250 }}>
       <CardMedia
       component="img"
       sx={{ width: 200 }}
       image={cancha}
       alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Ahora en la cancha
          </Typography>
          {loading ? <Box sx={{display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center'}}><CircularProgress /></Box>: <Box >
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {evento ? evento.evento : "sin eventos"}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {evento ? evento.anfitrion: null}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            
            {evento ? parseHora(evento.inicio) : null}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
             
            {evento ? parseHora(evento.fin): null}
          </Typography>
          </Box>  }
         
        </CardContent>
      </Box>
     
    </Card>
  );
}