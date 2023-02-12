/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useMemo } from "react";

import {
  Typography,
  List,
  ListItem,
  Avatar,
  Stack,
  Chip,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import Box from "@mui/material/Box";



import useAxios from "../utils/useAxios";


import Dialog from "@mui/material/Dialog";
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useAuth from "../hooks/useAuth";



// eslint-disable-next-line react/prop-types
export default function ModalReglas({ open, handleModal, setOpen}) {


    const handleCerrar = (e)=>{
        if (e.target.checked){
            setOpen(true)
        }
        handleModal()
    }
 

  return (
    <Dialog open={open} onClose={handleCerrar} maxWidth="md" fullWidth>
      <DialogTitle > Acpetar Condiciones de Uso</DialogTitle>
      <DialogContent sx={{width: '100%' , marginTop: 2}}>
        <Box sx={{ display: "flex", flexDirection: 'column', padding: 0, width: '100%' }}>
           
             
           
            <Stack direction="column" spacing={1} sx={{maxHeight: '600px', width:'100%', overflow: 'auto', display:'flex',flexDirection: 'column', alignItems:'center',border:1, borderColor:'#cecece', borderRadius:2}}>
         <Typography variant="body">
         1. OBJETIVO
Establecer metodología para uso de espacios comunes ante retorno y contingencia de salud
por SAR-COV-2
<br></br>
2. DEFINICIONES.
<br></br>
a. COVID-19: Corresponde a una amplia familia de virus que pueden generar enfermedades
respiratorias, desde un resfrío común a un Síndrome Respiratorio Agudo Severo (SARS).
Dentro de esta familia de virus, existe la cepa COVID-2019, que está provocando los cuadros
actuales.
<br></br>
b. Aforo de sala o taller: Número máximo autorizado de personas que se puede admitir al
interior de sala, taller o laboratorio.
<br></br>
c. Población de riesgo: Personas mayores de 65 años o quienes padecen de afecciones
médicas preexistentes, como hipertensión arterial, problemas cardíacos o diabetes.
<br></br>
3. ALCANCE.
<br></br>
El presente documento es aplicable a todas las actividades que se desarrollen dentro de espacios
comunes en sede La Serena
<br></br>
4. RESPONSABILIDADES.
<br></br>
Alumnos
<br></br>
• Cumplir con las medidas de prevención y las buenas prácticas de higiene.<br></br>
• Informar cualquier síntoma relacionado con el COVID-19.<br></br>
• Uso obligatorio de mascarillas al interior de la sede y espacios comunes.<br></br>
• Uso obligatorio de otros elementos de protección personal dependiendo de cada
espacio físico a utilizar.<br></br>
• Cuidar y mantener el buen uso del espacio común solicitado, tanto su
implementación como los recursos entregados por parte de la Institución.
<br></br>
<br></br>
6 Medidas preventivas en espacios comunes.
<br></br>
A. Señalética e instructivos para prevenir el contagio del COVID-19.<br></br>
B. Disponer de estaciones desinfección de alcohol gel en los accesos a la sede.<br></br>
C. Instalación de pediluvios al ingreso de la sede.<br></br>
D. Limpieza y desinfección constante.<br></br>
a. Posterior a cada bloque se debe gestionar la limpieza de todo el mobiliario.<br></br>
b. Se debe coordinar el uso y limpieza de estas para no generar aglomeración en
áreas comunes de la sede.<br></br>

E. Los alumnos deberán utilizar en todo momento sus elementos de protección personal<br></br>
a. Mascarilla<br></br>
b. Protector facial<br></br>
F. Se prohíbe la ingesta de líquidos o comida en los espacios cerrados.<br></br>
G. Se debe respetar la señalización para rutas de acceso y salida en los distintos edificios
con ingresos y salidas diferenciadas<br></br>
H. Respetar el aforo de cada uno de los espacios comunes. (cantidad de personas
dependiendo del área)<br></br>
I. El estudiante solicitante del uso de espacios comunes, será el responsable de que sus
acompañantes completen de forma correcta el cuestionario Covid-19 de actividades
deportivas al aire libre.
<br></br>
Se restringe el acceso a la sede todo colaborador (a) mayor de 65 años, diabéticos, hipertensos,
inmunodeficientes o con alguna afección respiratoria.

         </Typography>
    

            

                 </Stack>
                 <FormControlLabel  name='aceptar' id='aceptar' control={<Checkbox onChange={(e)=>handleCerrar(e)} />}
       label="Acepto las condciones" />
                
        </Box>
        
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
