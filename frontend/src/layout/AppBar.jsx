import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Link as RouterLink } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import { Box, Badge, Menu, MenuItem, Avatar, Typography, Autocomplete, Link, CircularProgress } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

import MobileDrawer from '../components/MobileDrawer';
import logo from '../assets/logo.png';
import MoreIcon from '@mui/icons-material/MoreVert';
import useAxios from '../utils/useAxios';
import useAuth from '../hooks/useAuth';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import TopBar from './TopBar.jsx';



const obtenerIniciales = (nombre) =>{
  let separado = nombre.split(" ");
  let iniNombre = separado[0].slice(0,1)
  let iniApe = separado[1].slice(0,1)
  let iniciales = iniNombre + iniApe
  return iniciales.toUpperCase()
}

function MobileAppBar() {

  const api = useAxios();
  const [cargando, setCargando] = useState(false);
  const [option, setOption] = useState([]);
  const [open, setOpen] = useState(false);
  const [noti, setNoti] = useState(0);
  const { user, logoutUser } = useAuth();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
 

 

  const filtrar = async (e)=>{
    setCargando(true)
    if(e.target.value){
      let url = `/getestemail/?search=${e.target.value}`
      const response = await api.get(url)
      setOption(response.data)
    }else{
      setOption([])
    }
    setCargando(false)
  }

  const navigate = useNavigate();
  const navegar = () => {
    navigate('/');
  };
  const location = useLocation();

  

 
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileOpen = ()=>{
    setMobileOpen(true)
  }
  const handleMobileClose = ()=>{
    setMobileOpen(false)
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

 
  
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      
      <MenuItem onClick={logoutUser}>Cerrar Sesión</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
     
      <MenuItem onClick={handleProfileMenuOpen}>
     
      
     
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>{user ? user.email:null}</p>
      </MenuItem>
    </Menu>
  );


  return (
    
    <>{matches ?
    <AppBar position="fixed" color="primary">
    <Toolbar>
      {location.pathname !== '/login' ? (
        <IconButton
          color="secondary"
          aria-label="open drawer"
          edge="start"
          onClick={ mobileOpen ? handleMobileClose : handleMobileOpen}
          sx={{
            paddingRight: 2,
          }}
        >
          <MenuIcon />
        </IconButton>
      ) : null}

      <IconButton
        edge="start"
        onClick={navegar}
        sx={{ fontWeight: 700, marginRight: 'auto', color:"#fff" }}
      >
        <img src={logo} width={60} alt="" />
      </IconButton>
      {location.pathname !== '/login' ? (<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <Box sx={{display: 'flex', alignItems: 'center', marginRight: 4}}>
            <Avatar sx={{background: '#bgbgbg'}}>{user ? obtenerIniciales(user.username) : null}</Avatar>
            <Typography sx={{marginLeft: 1}} variant="body1">{user ? user.email : null}</Typography>
            </Box>
        </IconButton>
      </Box>): null}
      
      
      <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </Box>

      {/* {user ? <Button onClick={logoutUser}sx={{fontWeight:700}} variant="contained" color="secondary">Salir</Button> : null} */}
    </Toolbar>
  </AppBar>: <TopBar />}
      
      {location.pathname === '/login' ? null : <MobileDrawer mobileOpen={mobileOpen} handleMobileClose={handleMobileClose}  />}
      {location.pathname === '/login' ? null : renderMobileMenu}
      {location.pathname === '/login' ? null : renderMenu}
    </>
  );
}

export default MobileAppBar;
