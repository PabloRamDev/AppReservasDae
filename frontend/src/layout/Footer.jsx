import React from 'react'
import {Box, Typography} from '@mui/material'


export default function Footer() {
    const fecha = new Date()
  return (
    <Box sx={{height: '8vh', display: 'flex', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#982828'}}>
        <Typography variant='h5' sx={{fontSize: 12}} color='secondary'>pabloram.dev@gmail.com</Typography>
        <Typography variant='h6' sx={{fontSize: 12}} color='secondary'>{fecha.getFullYear() + " Todos los derechos reservados"}</Typography>
        </Box>
  )
}
