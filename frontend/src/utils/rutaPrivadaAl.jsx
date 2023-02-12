/* eslint-disable react/react-in-jsx-scope */

import { Outlet, Navigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';


function RutaPrivadaAl() {
  const { user} = useAuth();


  if ( !user &&  user.tipo !== 'a') {
    return <Navigate to="/login" replace />;
  }

    return <Outlet />;
  }

 
  
 
 

export default RutaPrivadaAl;
