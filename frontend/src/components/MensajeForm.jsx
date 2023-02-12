import {useState} from 'react'
import { Box, TextField, Button, CircularProgress } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup';
import useAxios from '../utils/useAxios';
import SendIcon from '@mui/icons-material/Send';




export default function MensajeForm({invitados, confirmado, data, setAlertaOpen, setMensaje, setSeverity, setConfirmado, setInvitados, setSending, setSuccess}) {

  const api = useAxios();


  const handleSubmit = async (values) =>{
    setSending(true)
    const response = await api.post('invimasiva/',values)
    if(response.status === 200){
      setAlertaOpen(true);
      setConfirmado(false);
      setSending(false)
      setInvitados([]);
      setSuccess(true)
      setMensaje("Invitaciónes enviadas con éxito")
      setSeverity("success")
      
    }else{
      setAlertaOpen(true);
      setMensaje("Fallo en el envío")
      setSeverity("error")
      setConfirmado(false);
      setSending(false)
      setInvitados([]);

    }
  }

  const validationSchema = yup.object({
    mensaje: yup.string().min(10,"el mensaje debe ser superior a 10 caracteres").required("el mensaje es obligatorio")
  })
  const formik = useFormik({
    initialValues:{
      mensaje : ''
    },
    validationSchema,
    onSubmit: (values) => {
      if(confirmado){
      let solicitud = data[0]
      values = {...values, invitados, solicitud}
      handleSubmit(values)
      formik.resetForm()
      }
      
    }

  })
  return (

    
    <Box sx={{width:'100%', padding: 2, display:'flex',flexDirection:'column'}}>
      <form onSubmit={formik.handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
        <TextField
        multiline
        rows = {3}
        label='mensaje'
        name='mensaje'
        onChange={formik.handleChange}
        value={formik.values.mensaje}
        error={formik.touched.mensaje && Boolean(formik.errors.mensaje)}
        helperText={formik.touched.mensaje && formik.errors.mensaje}
        fullWidth= {true}
        
        >
        </TextField>
        {invitados && invitados.length > 0 && confirmado ? <Button variant="contained" fullWidth={true} endIcon={<SendIcon />} sx={{ marginTop: 1}} type="submit">Enviar</Button> :
        <Button variant="contained" fullWidth={true} disabled={true} endIcon={<SendIcon />} sx={{ marginTop: 1 }} type="submit">Enviar</Button> }
      </form>
    </Box>
  )
}
