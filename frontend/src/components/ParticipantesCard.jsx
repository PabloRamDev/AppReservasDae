import {useState, useEffect, useCallback} from 'react';
import { Card, Box, Chip, Stack, IconButton, Button} from '@mui/material';
import dayjs from 'dayjs'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardHeader } from '@mui/material';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import VisibilityIcon from '@mui/icons-material/Visibility';


export default function ParticipantesCard({setOpen}) {
 
    
    
    
    
  return (
    <Card sx={{width:'100%'}}>
        
        <Box sx={{backgroundColor:'#00c471', color:'#fff', display:'flex', padding:1, justifyContent:'center'}}>
        <Typography  sx={{marginRight: 1}}>Invitados</Typography>
         
      <EmojiPeopleIcon/>
      </Box>
      
        <CardContent>
        <Box sx={{width: '100%', display:'flex', flexDirection:'column', alignItems: 'center', height: 50}}>
        
        
        <Button size='large' sx={{fontWeight: 700}} color={'success'} endIcon={<VisibilityIcon/>} onClick={()=> setOpen(true)}> Ver</Button>
          </Box>

        </CardContent>
        
      
    </Card>
  );
}


