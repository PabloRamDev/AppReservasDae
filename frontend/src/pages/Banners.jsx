import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Fab
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2.js';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import useAxios from '../utils/useAxios.jsx';
import BannerCard from '../components/BannerCard.jsx';
import AddIcon from '@mui/icons-material/Add';
import ModalBanner from '../components/ModalBanner.jsx';
import BannerSkeleton from '../components/BannerSkeleton.jsx';
import Alerta from '../components/Alerta.jsx';
import Spinner from '../components/Spinner.jsx';



export default function Banners() {

    const api = useAxios();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const [banners, setBanners] = useState([]);
    const [loadbanner, setLoadbanner] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [open, setOpen] = useState(false);
    const [alertaOpen, setAlertaOpen] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [severity, setSeverity] = useState('');

    const handleOpen = () => {
        setOpen(true);
      };
    const handleClose = () => {
        setOpen(false);
      };

    useEffect(()=> {
      setLoading(true);
        const getBanners= async ()=>{
            const response = await api.get('/crearbanner/');
            try {
                if (response.status === 200){
                    setBanners(response.data)
                    setLoading(false)
                    
                    
                }
            } catch (error) {
                console.log(error.message)   
            }
        }
        getBanners()
        setSuccess(false);
        
     
    
        
        
        
    }, [success])

  
    
    return (
      
        <Box sx={{minHeight: '100vh',
        minWidth:'90vw',
        backgroundColor: '#ededed',
        padding: matches ? 0 : 2,
        paddingLeft: matches ? 2 : 8,
        paddingTop: matches ? 10 : 10, }}>
            
            <Grid2 container spacing={2} sx={{width: '100%', height: '100%'}}>
           
              
                  {banners?.map(banner => (
                    <Grid2
                    key={banner.id}
                    xs={12}
                    sm={6}
                    md={4}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <BannerCard banner={banner} setSuccess={setSuccess} setAlertaOpen={setAlertaOpen} setMensaje={setMensaje} setSeverity={setSeverity} />
                    </Grid2>
                  ))}
                  {loadbanner ? <Grid2 xs={12}
                  sm={6}
                  md={4}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <BannerSkeleton />
                
                  </Grid2> : null}
              
            </Grid2>
            <Fab color='primary' size='large' sx={{position: 'fixed', bottom: '5%', left: '90%'}} onClick={handleOpen}><AddIcon /></Fab>
            <ModalBanner open={open} handleClose={handleClose} setSuccess={setSuccess} setLoadbanner={setLoadbanner} setAlertaOpen={setAlertaOpen} setMensaje={setMensaje} setSeverity={setSeverity} />
            <Alerta open={alertaOpen} setOpen={setAlertaOpen} severity={severity}  mensaje={mensaje}/>
        </Box>
        
        );
      }
    
