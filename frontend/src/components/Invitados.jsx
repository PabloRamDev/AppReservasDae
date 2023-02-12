import React from "react";
import { Box, Typography, Chip, Stack,Checkbox,FormControlLabel, Button} from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import CancelIcon from '@mui/icons-material/Cancel';


export default function Invitados({invitados, agregarInvi, setConfirmado }) {

    const handleDelete = (inv)=>{
        let arr = invitados.filter(invitados => invitados !== inv)
        agregarInvi(arr)
    }
    
  
    const handleCheck = (e) =>{
    
      setConfirmado(e.target.checked)
  }
    
   
  return (
    <Box sx={{width: '100%', display:'flex', flexDirection:'column', padding: 2, alignItems: 'center'}}>
        
      {invitados.length < 1 ? <Typography color='#838383'>Sin Destinatarios</Typography> : <Box sx={{width: '100%', height: '100%', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
      <Stack direction="column" spacing={1} sx={{maxHeight: '150px', width:'100%',overflow: 'auto', display:'flex',flexDirection: 'column', alignItems:'center',border:1, borderColor:'#cecece', borderRadius:2}}>
         {invitados ? invitados.map((inv)=>{
           return <Chip size='small'color="primary" sx={{width:'60%'}} label={inv.user_id.email} key={inv.user_id.id} onDelete={()=>handleDelete(inv)}/>
        }): null}
      </Stack>
   

    <FormControlLabel  name='aceptar' id='aceptar' control={<Checkbox onChange={(e)=>handleCheck(e)} />}
       label="Los datos son correctos" />

   
    </Box>}
      
    
      

    </Box>
  );
}
