import { useNavigate } from 'react-router-dom';
import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";



const baseURL = "https://dae-api-test.onrender.com/api/";
console.log(baseURL);
const controller = new AbortController();


const useAxios = () => {
  const { authTokens, setUser, setAuthTokens, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  

  const axiosInstance = axios.create({
    signal: controller.signal,
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` }
  });

  axiosInstance.interceptors.request.use(async req => {

    const user = jwt_decode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired){
      return req;
    }
    

    const response = await axios.post(`${baseURL}token/refresh/`, {
      signal: controller.signal,
      refresh: authTokens.refresh,
    
    }).catch(error => {navigate("/login")
    
    localStorage.clear()}
    );
    

      if(response.status === 200){
        localStorage.setItem("authTokens", JSON.stringify(response.data));

        setAuthTokens(response.data);
        setUser(jwt_decode(response.data.access));
    
        req.headers.Authorization = `Bearer ${response.data.access}`;
        return req;
      
      }else{
        controller.abort();

      }
     

  });

  return axiosInstance;
};

export default useAxios;