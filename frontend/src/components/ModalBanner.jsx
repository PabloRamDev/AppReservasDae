/* eslint-disable react/react-in-jsx-scope */
import { useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Select, MenuItem } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import * as yup from 'yup';
import { useFormik } from 'formik';
import useAxios from '../utils/useAxios';


// eslint-disable-next-line react/prop-types
export default function ModalBanner({ open, handleClose, setSuccess, setLoadbanner, setAlertaOpen, setSeverity, setMensaje }) {
  const api = useAxios();


  const HandleSubmit = async (valores) => {


      const response = await api.post(
        '/crearbanner/',
        valores,
        {headers: {"Content-Type": "multipart/form-data"}},
      )
        if(response.status === 201){
          setSuccess(true);
          setLoadbanner(false);
          setAlertaOpen(true)
          setSeverity('success')
          setMensaje("Banner creado con éxito")
  
        }else{
          setAlertaOpen(true)
          setSeverity('error')
          setMensaje("Hubo un error")
        }
   

  };

  const validationSchema = yup.object({
    titulo: yup
      .string('titulo')
      .required('el nombre del Banner es obligatorio'),
  });

  const formik = useFormik({
    initialValues: {
      titulo: '',
      imagen: null,
    },
    validationSchema,
    onSubmit: (values) => {
      setLoadbanner(true);
      HandleSubmit(values);
      formik.resetForm({ values: '' });
      handleClose();
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Agregar Banner</DialogTitle>
      <DialogContent>
        <DialogContentText />

        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              size="small"
              margin="dense"
              id="titulo"
              label="Título"
              type="text"
              variant="outlined"
              color="primary"
              value={formik.values.titulo}
              onChange={formik.handleChange}
              error={formik.touched.titulo && Boolean(formik.errors.titulo)}
              helperText={formik.touched.titulo && formik.errors.titulo}
            />
           
            <Button
              containerelement="label" // <-- Just add me!
              label="Agregar Imagen"
            >
              <input
                name="imagen"
                type="file"
                id="imagen"
                accept="image/*"
                onChange={(event) => {
                  formik.setFieldValue('imagen', event.currentTarget.files[0]);
                  console.log(event.currentTarget.files[0]);
                }}
              />
            </Button>
            <DialogActions sx={{ justifyContent: 'center', marginTop: 3 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Crear Banner
              </Button>
            </DialogActions>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}