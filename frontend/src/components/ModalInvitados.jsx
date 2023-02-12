/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useMemo } from "react";

import {
  Typography,
  List,
  ListItem,
  Avatar,
  Stack,
  Chip,
} from "@mui/material";
import Box from "@mui/material/Box";



import useAxios from "../utils/useAxios";


import Dialog from "@mui/material/Dialog";
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useAuth from "../hooks/useAuth";



// eslint-disable-next-line react/prop-types
export default function ModalInvitados({ open, handleClose, partic }) {
  const [loading, setLoading] = useState(false);
  const api = useAxios();
  const {user} = useAuth();
  let confirmados = [];
  let rechazados = [];


 




  const handleEliminar = async (id) => {

    await api.delete(
      '/invitacion/',
      {
        params: {
          id: id,
        },
      },
    ).catch(error => 
      error.response
    );
      

};

  const HandleSubmit = async (valores) => {
    setLoading(true);
    try {
      const response = await api
        .post("solicitud/", { ...valores, solicitante_id: user.user_id })
        .catch((error) => {
          if (error.response) {
          }
        });
      if (response.status === 200) {
        setLoading(false);
        handleClose();
      }
    } catch {}
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{backgroundColor: '#00c471', color: '#fff'}}> Invitados</DialogTitle>
      <DialogContent sx={{width: '100%' , marginTop: 2}}>
        <Box sx={{ display: "flex", padding: 0, width: '100%' }}>
           
             
           
            <Stack direction="column" spacing={1} sx={{maxHeight: '150px', width:'50%', overflow: 'auto', display:'flex',flexDirection: 'column', alignItems:'center',border:1, borderColor:'#cecece', borderRadius:2}}>
            <Box sx={{backgroundColor: '#0288d1', color: '#fff', width: '100%', margin: 0, textAlign: 'center'}}>
              <Typography>Pendientes</Typography>
            </Box>
              {
                partic ?

              partic.map((part) => (
                 part.estado === 'p' ?
                      <Chip size='medium'color="info" sx={{width:'80%'}} label={part.invitado.email} key={part.id} onDelete={()=>handleEliminar(part.id)}/>
                      : null
              )
              )
                  : null}
                  
                 </Stack>

                 <Stack direction="column" spacing={1} sx={{maxHeight: '150px', width:'50%', overflow: 'auto', display:'flex',flexDirection: 'column', alignItems:'center',border:1, borderColor:'#cecece', borderRadius:2}}>
            <Box sx={{backgroundColor: '#00c471', color: '#fff', width: '100%', margin: 0, textAlign: 'center'}}>
              <Typography>Confirmados</Typography>
            </Box>
              {
                partic ?
              partic.map((part) => (
                 part.estado === 'a' ?
                      <Chip size='medium' sx={{width:'80%', backgroundColor:'#00c471', color: '#fff'}} label={part.invitado.email} key={part.id} onDelete={()=>handleEliminar(part.id)}/>
                      : null
              )
              )
                  : null}
                  
                 </Stack>
                 
              
      
              
        </Box>
        
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
