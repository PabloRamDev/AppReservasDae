/* eslint-disable react/react-in-jsx-scope */

import { Outlet, Navigate} from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';


function RutaPrivadaInfo() {
  const { user} = useContext(AuthContext);


  if ( !user ||  user.tipo !== 'i') {
    return <Navigate to="/login" replace />;
  }
    return <Outlet />;
  }

 
  
 
 

export default RutaPrivadaInfo;
