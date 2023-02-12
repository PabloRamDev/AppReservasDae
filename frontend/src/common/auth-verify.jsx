import { useEffect} from 'react';

import jwt_decode from 'jwt-decode';
import { withRouter } from './withRouter';



const AuthVerify = (props)=>{
    

const location = props.router.location;
useEffect(() => {
    const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    if (token) {
      const decodedJwt = jwt_decode(token.access);

      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  }, [location]);

  return <></>

}

export default withRouter(AuthVerify);