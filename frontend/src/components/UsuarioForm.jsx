/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, Typography, InputLabel, FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import * as yup from "yup";
import { useFormik } from "formik";
import useAxios from "../utils/useAxios";

import useAuth from "../hooks/useAuth";


import CircularProgress from "@mui/material/CircularProgress";
// eslint-disable-next-line react/prop-types
export default function UsuarioForm({setAlertaOpen, setMensaje, setSeverity }) {
 
  const [loading, setLoading] = useState(false);
  const api = useAxios();
  const { user, registerUser } = useAuth();


  const HandleSubmit = async (valores) => {
    setLoading(true);
    try {
     registerUser(valores.email,valores.username,valores.password,valores.password2,valores.tipo)
     setAlertaOpen(true)
     setMensaje('usuario registrado con éxito');
    setSeverity('success')
    } catch {}
    setLoading(false)
  };

  const emailreg = /^[A-Za-z0-9._%+-]+(@inacapmail)\.cl$/;

  const validationSchema = yup.object({
    email: yup
    .string('Ingresa un email')
    .matches(emailreg, "correo inacap inválido")
    .email('Ingresa un email válido')
    .required('el email es obligatorio'),
    username: yup
      .string("Nombre de usuario")
      .required("EL nombre de usuario es obligatorio"),
    password: yup
      .string("contraseña")
      .required("la contraseña es obligatoria"),
    password2: yup
      .string("confirme contraseña")
      .required("la contraseña 2 es obligatoria"),
    tipo: yup
      .string("tipo de usuario")
      .required("el tipo es obligatorio"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      password2:"",
      tipo: "",
    },
    validationSchema,
    onSubmit: (values) => {
      HandleSubmit(values);
      formik.resetForm({ values: "" });
    },
  });

  return (

        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              sx={{ marginY: 1 }}
              size="normal"
              id="email"
              label="Email"
              type="text"
              variant="outlined"
              color="primary"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
             <TextField
              sx={{ marginY: 1 }}
              size="normal"
              id="username"
              label="Nombre de usuario (Nombre Apellido)"
              type="text"
              variant="outlined"
              color="primary"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
 <TextField
              sx={{ marginY: 1 }}
              size="normal"
              id="password"
              label="Contraeña"
              type="password"
              variant="outlined"
              color="primary"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errorspassword}
            />
             <TextField
              sx={{ marginY: 1 }}
              size="normal"
              id="password2"
              label="Contraeña"
              type="password"
              variant="outlined"
              color="primary"
              value={formik.values.password2}
              onChange={formik.handleChange}
              error={formik.touched.password2 && Boolean(formik.errors.password2)}
              helperText={formik.touched.password2 && formik.errorspassword2}
            />
            <FormControl fullWidth>
  <InputLabel id="tipo">Tipo</InputLabel>
  <Select
    labelId="tipo"
    id="tipo"
    name="tipo"
    value={formik.values.tipo}
    label="Age"
    onChange={formik.handleChange}
  >
    <MenuItem value={'a'}>Estudiante</MenuItem>
    <MenuItem value={'d'}>Dae</MenuItem>
    <MenuItem value={'i'}>informático</MenuItem>
  </Select>
</FormControl>

           
              <Box sx={{height: '50px', display:'flex', justifyContent: 'center', alignCenter:'center'}}>
      {loading ?
              <CircularProgress />
           : null }
           </Box>
                
              <Button
                sx={{ width: "200px", alignSelf: "center", marginTop: 1}}
                variant="contained"
                color="primary"
                type="submit"
              >
                Registrar 
              </Button>
        
          </Box>
        </form>
  );
}
