import * as React from 'react';
import { Card, Box, Chip, Stack} from '@mui/material';
import dayjs from 'dayjs'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardHeader } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function TiempoCard({data}) {
  return (
    <Card sx={{width:'100%'}}>
        
        <Box sx={{backgroundColor:'#ff9c00', color:'#fff', display:'flex', padding:1, justifyContent: 'center'}}>
        <Typography  sx={{marginRight: 1}}>Fecha y hora</Typography>
         
      <AccessTimeIcon sx={{verticalAlign:-6}}/>
      </Box>
     
        
      
      
        
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        <CardContent>
          
          {data ? (
          <Box sx={{display:'flex',alignItems:'center',justifyContent:'center', padding: 0, height: 50}}>
            <CalendarMonthIcon sx={{marginRight:2}} /> <Typography>{dayjs(data[0].horaIni)
                .locale("es")
                .format("ddd D MMM HH:mm")
                .toString()} - {dayjs(data[0].horaTer)
                .locale("es")
                .format("ddd D MMM HH:mm")
                .toString()}
</Typography>
    </Box>
        ) : null}
        
        
        </CardContent>
      
    </Card>
  );
}


