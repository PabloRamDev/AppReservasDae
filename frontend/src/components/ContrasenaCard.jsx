import {useState, useEffect, useCallback} from 'react';
import { Card, Box, Chip, Stack, IconButton} from '@mui/material';
import dayjs from 'dayjs'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardHeader } from '@mui/material';
import PasswordIcon from '@mui/icons-material/Password';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export default function ContrsenaCard({data}) {
    const [clave, setClave] = useState('')

    const ocultarPalabra = useCallback(()=>{
        
        setClave('••••••••')  
      },[]) 

      useEffect(()=>{
        ocultarPalabra()
      },[ocultarPalabra])
    
    
    
  return (
    <Card sx={{width:'100%'}}>
        
        <Box sx={{backgroundColor:'#018bb0', color:'#fff', display:'flex', padding:1, justifyContent:'center'}}>
        <Typography  sx={{marginRight: 1}}>Contraseña</Typography>
      <PasswordIcon/>
      </Box>
        <CardContent>
            <Box sx={{display:'flex',alignItems:'center',justifyContent:'center', padding: 0, height: 50}}>
            {data ? <Typography>ver: {clave}</Typography> :null}
            {data ? <IconButton aria-label="Aceptar" onClick={()=>clave === '••••••••' ? setClave(data[0].clave) : setClave('••••••••')}>
            {clave === '••••••••' ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
          </IconButton> : null}
          </Box>

        </CardContent>
        
      
    </Card>
  );
}


