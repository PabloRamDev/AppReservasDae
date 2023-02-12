import {useState} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import useAxios from '../utils/useAxios.jsx';


export default function BannerCard({banner, setSuccess, setAlertaOpen, setSeverity, setMensaje}) {

    // const handleCheck = ()=>{

    // }
    const api = useAxios();
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id)=>{
        setLoading(true);
        
        try {
          const response = await api.delete(`/banner/${id}`);
          if(response.status === 204){
            setSuccess(true)
            setAlertaOpen(true)
            setSeverity('success')
            setMensaje("Banner eliminado con éxito")
          }
          
        } catch (error) {
          console.log(error.message)
          setAlertaOpen(true)
          setSeverity('error')
          setMensaje("Hubo un error")
          
        }
        
        
     
        
    }

    const handleChecked = async (e)=>{
      setLoading(true);
      try {
        const response = await api.patch(`/banner/${banner.id}`,
        {active: e},
        {headers: {"Content-Type": "multipart/form-data"}}
        );
       
        if(response.status === 200){
          setSuccess(true);
          if(e === true){
            setAlertaOpen(true)
            setSeverity('success')
            setMensaje("Banner anclado a Inicio ")
          }else{
            setAlertaOpen(true)
            setSeverity('warning')
            setMensaje("Banner borrado de Inicio ")

          }
         
        }
      } catch (error) {
        console.log(error.message)
        
      }
       

    }


    
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={banner.imagen_url}
        alt={banner.titulo}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {banner.titulo}
        </Typography>
        <FormGroup>
            <FormControlLabel control={<Checkbox  checked={banner.active} onChange={e => handleChecked(e.target.checked)} />} label="Mostrar en Home" />
           
        </FormGroup>
      </CardContent>
      <CardActions sx={{display: 'flex', justifyContent: 'space-around'}}>
        
        <Button variant="contained" fullWidth color="success" size="small">Editar</Button>
        <Button variant="contained" fullWidth color="primary" size="small" onClick={()=> handleDelete(banner.id)}>Eliminar</Button>
       
      </CardActions>
    </Card>
  )
}
