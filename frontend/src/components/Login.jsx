/* eslint-disable react/react-in-jsx-scope */
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import * as yup from 'yup';
import { useFormik } from 'formik';
import AuthContext from '../context/AuthContext';




export default function Login({setLoading, setMensaje,setOpen}) {
  const navigate = useNavigate();

  const { loginUser } = useContext(AuthContext);
 
// useEffect(()=>{

//   const setAlertaOpen = ()=>{
//     if(status === 401){
//       setOp(true)
//       setMsg('Contraseña inválida')
//       console.log(status)

//     }else{
//       setOp(false)
//     }

//   }
//   setAlertaOpen()

// },[status])

  const HandleSubmit = async (valores) => {

    setLoading(true)
    try {
      await loginUser(valores.email, valores.password)
      navigate('/')
      setLoading(false)
    }
    catch{
      setLoading(false)
      setMensaje("Contraseña inválida")
      setOpen(true)

    }
 
   
   
  };
  const emailreg = /^[A-Za-z0-9._%+-]+(@inacapmail)\.cl$/;
  
  const validationSchema = yup.object({
    email: yup
      .string('Ingresa un email')
      .matches(emailreg, "correo inacap inválido")
      .email('Ingresa un email válido')
      .required('el email es obligatorio'),
    password: yup
      .string('Ingresa tu contraseña')
      .min(5, 'Contraseña inválida')
      .required('La contraseña es obligatoria'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      HandleSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth:'350px' }}>

        <TextField
          margin="dense"
          width="100%"
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          color="primary"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          margin="dense"
          id="password"
          label="Contraseña"
          type="password"
          variant="outlined"
          color="primary"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button size="large" variant="contained" color="primary" sx={{ marginTop: 2 }} fullWidth type="submit">Aceptar</Button>

      </Box>
      
    </form>

  );
}
