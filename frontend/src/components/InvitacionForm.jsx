/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import { useContext, useState, useEffect, useRef } from 'react';
import {
  Autocomplete, TextField, Typography, Button
} from '@mui/material';
import Box from '@mui/material/Box';
import  * as yup from 'yup'
import { useFormik } from 'formik';
import useAxios from '../utils/useAxios';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';


// eslint-disable-next-line react/prop-types
export default function InvitacionForm({data, agregarInvi, invitados, participantes}) {

  const [users, setUsers] = useState([])
  const [option, setOption] = useState([])
  const [message, setMessage] = useState('');
  
  // const navigate = useNavigate();

  // const { loginUser } = useContext(AuthContext);

  const api = useAxios();

  
  const filtrar = async (e)=>{

    if(e.target.value){
      let url = `/getestemail/?email__icontains=${e.target.value}`
      const response = await api.get(url)
      let arr2 = []
      response.data.forEach(e => {
        e = {...e, "disabled":false}
        if(invitados && participantes && (invitados.some(el => el['user_id'].email === e.email || participantes.some(el => el['invitado'].email === e.email)))){
          e.disabled = true
          arr2.push(e) 
        }else{
        arr2.push(e)
        }
      }
        
      )
      setOption(arr2)
    }
  }

  const HandleSubmit = (valores) => {
   
    
    let arrInvi = [...invitados,valores]
    agregarInvi(arrInvi)
    setOption([])
    
  };

 
const validationSchema = yup.object({
  user_id: yup.object({
    id: yup.string().uuid().required(),
    username: yup.string().required(),
    email: yup.string().email("Ingresa un correo inacap válido").required("Campo Obligatorio")

  })
 
})
 

  const formik = useFormik({
    initialValues: {
      user_id: {
        id: null, username: '', email: '',
      }
    },
    validationSchema,
    onSubmit: (values) => {
      
      HandleSubmit(values);
      formik.resetForm({values:{
        user_id: ""
     
      }});
      
     
    },
  });

  return (
    <Box sx={{width: '100%', padding: 2}}>
      <form onSubmit={formik.handleSubmit}>
        
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justiItems:'center', width:'100%'}}>
          
            <Autocomplete
          
              id="user_id"
              name="user_id"
              options = {option}
              filterOptions = {(x)=>x}
              getOptionLabel={(option) => option.email}
              getOptionDisabled={(option)=>option.disabled}
              style ={{width: '100%'}}
              clearOnBlur={true}
              value={null}
              onChange={(e,value) => {
                
                formik.setFieldValue(
                  'user_id',
                  value !== null ? value: formik.initialValues.user_id,
                )
              }
              }
              
              renderInput={(params) => (
                
                <TextField
                  
                  margin="normal"
                  label="estudiantes"
                  fullWidth
                  name="email"
                  onChange={(e)=>filtrar(e)}
                  {...params}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                
                />
              )}
            />
          

<Button color='primary' variant='contained' type="submit" endIcon={<PersonAddAlt1Icon color='secondary' />}> Agregar</Button>
          </Box>
      </form>
      </Box>


  );
}
