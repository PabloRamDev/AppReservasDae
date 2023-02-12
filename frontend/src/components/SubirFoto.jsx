/* eslint-disable react/react-in-jsx-scope */
import { useContext } from 'react';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import { Select, MenuItem } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
// import * as yup from 'yup';
import { useFormik } from 'formik';
import useAxios from '../../utils/useAxios';
import LoadContext from '../../context/LoadContext';

// eslint-disable-next-line react/prop-types
export default function SubirFoto({ open, handleClose, pk }) {
  const api = useAxios();
  const { setPost, setAlert } = useContext(LoadContext);

  const HandleSubmit = async (valores) => {
    setPost(true);
    try {
      const response = await api.patch(
        '/instancias/',
        { foto: valores.foto },
        {
          params: {
            id: pk,
          },
          headers: {
            'Content-type': 'multipart/form-data',
          },
        },
      ).then(() => {
        setPost(false);
        setAlert(true);
      }).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        }
      });

      console.log(response);
    } catch {
      console.log('wena');
    }

    // const generarPdf = async () => {
    //   try {
    //     await api.get(`/genpdf/?id=${id}`,{
    //       responseType:'blob'
    //     }).then((res) => {

    //       fileDownload(res.data,'codigos.pdf')
    //     });

    // } catch {

    // }
    // }
  };

  //   const validationSchema = yup.object({
  //     nombre: yup
  //       .string('Ingresa nombre de la factura')
  //       .required('el nombre de la factura es obligatorio'),
  //     total: yup
  //       .number('Ingresa el total')
  //       .positive('El valor debe ser positivo')
  //       .required('el total de la factura es obligatorio'),
  //     fecha: yup
  //       .date('ingrese la fecha')
  //       .required('La fecha de la factura es obligatoria'),
  //     tipo: yup.string('tipo de recurso').required('Seleccione tipo de recurso'),
  //   });

  const formik = useFormik({
    initialValues: {
      foto: null,
    },
    onSubmit: (values) => {
      HandleSubmit(values);
      handleClose();
    },
  });

  return (
    <Box>
      {open ? (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>Agregar Foto</DialogTitle>
          <DialogContent>
            <DialogContentText />

            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                <Button
                  containerElement="label" // <-- Just add me!
                  label="My Label"
                >
                  <input
                    name="foto"
                    type="file"
                    id="foto"
                    accept=".jpg"
                    onChange={(event) => {
                      formik.setFieldValue('foto', event.currentTarget.files[0]);
                    }}
                  />
                </Button>
                <DialogActions sx={{ justifyContent: 'center', marginTop: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Subir Foto
                  </Button>
                </DialogActions>
              </Box>
            </form>
          </DialogContent>
        </Dialog>
      )
        : null}
    </Box>
  );
}
