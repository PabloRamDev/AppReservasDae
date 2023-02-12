import Carousel from 'react-material-ui-carousel';
import { Paper, Box } from '@mui/material';
import BannerImg from './BannerImg.jsx';


export default function Carrusel({banners}) {

    const activos = banners?.filter(banner => banner.active === true);

           
        return (
            <Carousel height={250}>
                {activos?.map(banner =>(
                    <BannerImg key={banner.id} banner={banner}/>
                )

             )
        
        }
            </Carousel>
         
        );
      }

