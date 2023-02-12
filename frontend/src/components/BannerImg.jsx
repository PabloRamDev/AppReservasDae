import styled from "styled-components";
import {Box, Typography} from "@mui/material"
import "@fontsource/oswald";



export default function BannerImg({banner}) {

    const {imagen_url, titulo} = banner

   
  return (
    <Box sx={{ backgroundImage: `linear-gradient( to bottom, rgb(0 0 0 /.10), rgb(0 0 0/.70)), url(${imagen_url})`, backgroundSize: 'cover', height: { md: 400, sm: 300, xs: 250}}}>
        
        <Typography variant="h4" color="white" sx={{position: 'absolute', bottom: '5%', left: '5%', fontSize: {md: 60}}}>
              {titulo}
        </Typography>
        </Box>
  )
}