import React, { useState, useEffect, useContext, useRef } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Link as RouterLink } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import { Box, Badge, Menu, MenuItem, Avatar, Typography, Autocomplete, Link, CircularProgress } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

import SearchIcon from '@mui/icons-material/Search';

import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

import MiniDrawer from '../components/MiniDrawer';
import logo from '../assets/logo.png';
import MoreIcon from '@mui/icons-material/MoreVert';
import useAxios from '../utils/useAxios';
import useAuth from '../hooks/useAuth';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  minWidth: '300px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 0.5),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '300px',
    },
  },
}));


const obtenerIniciales = (nombre) =>{
  let separado = nombre.split(" ");
  let iniNombre = separado[0].slice(0,1)

  return iniNombre.toUpperCase()
}

function TopBar() {
  const api = useAxios();
  const [cargando, setCargando] = useState(false);
  const [option, setOption] = useState([]);
  const [open, setOpen] = useState(false);
  const [noti, setNoti] = useState(0);
  const { user, logoutUser } = useAuth();

  

  const filtrar = async (e)=>{
    setCargando(true)
    if(e.target.value){
      let url = `/getestemail/?email__icontains=${e.target.value}`
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [mobileOpen, setMobileOpen] = useState(false);

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
    <>
      <AppBar position="fixed" color="primary" >
        <Toolbar>
          {location.pathname !== '/login' ? (
            <IconButton
              color="secondary"
              aria-label="open drawer"
              edge="start"
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              sx={{
                marginRight: 2,
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : null}

          <IconButton
            edge="start"
            onClick={navegar}
            sx={{ fontWeight: 700,marginLeft:2, marginRight: 10, color:"#fff" }}
          >
            <img src={logo} width={60} alt="" />
          </IconButton>
          {location.pathname !== '/login' && user.tipo !== 'a' ? (
             <Autocomplete
          
             id="user_id"
             name="user_id"
             options = {option} 
             freeSolo
             filterOptions = {(x)=>x}
             getOptionLabel={(option) => option.email}
             getOptionDisabled={(option)=> option.disabled}
             clearOnBlur={true}
             blurOnSelect={true}
             value={null}
             sx={{
              width: '20%',
              padding: 0
             }}
            //  onChange = {() =>reiniciarInput(inputRef)}
          
           
             renderOption={(props, option) => (
              <Box component={RouterLink} to={`/estudiantes/${option.id}`} sx={{ margin:0, flexShrink: 0, textDecoration: 'none', color: '#4e4e4e', fontSize: 18}} {...props}>
                <Avatar sizes='small' sx={{marginRight: 1, backgroundColor: user.color, width: 30, height: 30}} >{option.email.slice(0,1).toUpperCase()}</Avatar>
             
                 {option.email}
              </Box>
              
            )}
             
             renderInput={(params) => {

             const {InputLabelProps,InputProps,...rest} = params
            return (
              
              <Search>
                
              <SearchIconWrapper>
                {cargando ? <CircularProgress sx={{padding: 1}} color='secondary'/> : <SearchIcon sx={{marginLeft: 1}} /> }
              </SearchIconWrapper>
              <StyledInputBase
                {...params.InputProps} {...rest}
                 margin="dense"
                 placeholder='buscar estudiante por correo inacap...'
                 fullWidth
                 name="email"
                 onChange = {e => filtrar(e)}
                 
            
               />
            </Search>
          
          )}}
           />
          ) : null}
          <Box sx={{ flexGrow: 1 }} />
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
                <Avatar sx={{background: user.color}}>{user ? obtenerIniciales(user.username) : null}</Avatar>
                <Typography sx={{marginLeft: 1}} variant="body1">{user ? user.email : null}</Typography>
                </Box>
            </IconButton>
          </Box>): null}
          
          
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
      </AppBar>
      {location.pathname === '/login' ? null : <MiniDrawer open={open} handleClose={handleDrawerClose} />}
      {location.pathname === '/login' ? null : renderMobileMenu}
      {location.pathname === '/login' ? null : renderMenu}
    </>
  );
}

export default TopBar;
