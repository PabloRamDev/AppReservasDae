/* eslint-disable react/react-in-jsx-scope */

import { Outlet, Navigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';


function RutaPrivadaDae() {
  const { user} = useAuth();

  
  if (!user || user.tipo !== 'd') {
    return <Navigate to="/login" replace />;
  }else{

  return <Outlet />;}
}
export default RutaPrivadaDae;