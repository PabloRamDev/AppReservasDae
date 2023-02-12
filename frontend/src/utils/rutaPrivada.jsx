/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react'
import { Outlet,Navigate, useLocation, useNavigate} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import useAuth from '../hooks/useAuth';
import MobileAppBar from '../layout/AppBar.jsx';
import { Box } from '@mui/material';




function RutaPrivada() {

  


  const { user, logoutUser} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
 



  useEffect(() => {
    
    if (localStorage.getItem('authTokens') !== undefined) {
      try {const token = JSON.parse(localStorage.getItem('authTokens'))
      const decodedJwt = jwt_decode(token.refresh);
      if (decodedJwt.exp * 1000 < Date.now()) {
        
        

      }
    } catch(error) {
      console.log(error)
      navigate("/login")
        localStorage.clear()
    }
      

    
    }
  }, [location, user]);
  return <>

    {user ? <><MobileAppBar  /><Outlet/></> : <Navigate to = "/login" /> }
</>


}
export default RutaPrivada;
