import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }) {

  const [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('authTokens')
    ? JSON.parse(localStorage.getItem('authTokens'))
    : null));
  const [user, setUser] = useState(() => (localStorage.getItem('authTokens')
    ? jwt_decode(localStorage.getItem('authTokens'))
    : null));
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState()

  const loginUser = async (email, password) => {
    const response = await axios.post( `${process.env.REACT_APP_API_URL}/api/login/`, {
        email,
        password,
      }).catch(function(error) {setStatus(error)})


    if (response.status === 200) {
     
      setAuthTokens(response.data);
      setUser(jwt_decode(response.data.access));
      localStorage.setItem('authTokens', JSON.stringify(response.data));
    }
 
  };

  const registerUser = async (email,username, password, password2,tipo) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        username,
        password,
        password2,
        tipo,
      }),
    });
    if (response.status === 201) {
    //   history.push("/login");
    } else {
      alert('Algo salio mal!');
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('authTokens');
    setAuthTokens(null);
    setUser(null);
    // history.push("/");
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextData = {
    status,
    setStatus,
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
}

  