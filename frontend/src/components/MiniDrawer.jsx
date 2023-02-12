
import {useState} from 'react'
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PanoramaIcon from '@mui/icons-material/Panorama';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TaskIcon from '@mui/icons-material/Task';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import useAuth from '../hooks/useAuth';
import { Avatar , Box, ListItem, Typography, Toolbar, Divider} from '@mui/material';

import { Link, useLocation  } from 'react-router-dom';
import { useCallback } from 'react';

const drawerWidth = 270;



const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


// eslint-disable-next-line react/prop-types
function MiniDrawer({ open, handleClose}) {

  const { user } = useAuth();
  const handleClick = () => {
    handleClose()
  }



  return (
    <Drawer variant="permanent" open={open} >
      <Toolbar
     
        sx={{
          marginTop: 8,
        }}
      ><ListItem disablePadding>
        <ListItemButton component={Link} to={`/miperfil/${user.user_id}`}>
        <ListItemIcon
          sx={{
            marginLeft: -3,
          }}
        
        >
          <SettingsIcon />
        </ListItemIcon>
        {user && user.tipo === 'd' ? <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Box sx={{margin:0, flexShrink: 0, textDecoration: 'none', color: '#4e4e4e', fontSize: 18, display: 'flex', alignItems: 'center'}}>
        <Avatar sizes='small' sx={{marginRight: 1, backgroundColor: user.color ,width: 30, height: 30}} >{user.email.slice(0,1).toUpperCase()}</Avatar>
        <Typography> {user.email}</Typography>
        </Box>
        </Box> : <Typography> Administrar </Typography>}
        </ListItemButton>
        </ListItem>
        
      </Toolbar>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/" onClick={handleClose}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItemButton>
      </ListItem>
      {user && user.tipo === 'd' ? <ListItem disablePadding>
        <ListItemButton component={Link} to="/agenda" onClick={handleClose}>
          <ListItemIcon>
            < CalendarMonthIcon/>
          </ListItemIcon>
          <ListItemText primary="Agenda" />
        </ListItemButton>
      </ListItem> : null }
     {user && user.tipo === 'd' ?
     <ListItem disablePadding>
        <ListItemButton component={Link} to="/solicitudes" onClick={handleClose}>
          <ListItemIcon>
            <TaskIcon/>
          </ListItemIcon>
          <ListItemText primary="Solicitudes" />
        </ListItemButton>
      </ListItem> : null}
      {user && user.tipo === 'd' ?
     <ListItem disablePadding>
        <ListItemButton component={Link} to="/banners" onClick={handleClose}>
          <ListItemIcon>
            <PanoramaIcon/>
          </ListItemIcon>
          <ListItemText primary="Banner Home" />
        </ListItemButton>
      </ListItem> : null}
      {user && user.tipo === 'i' ?
     <ListItem disablePadding>
        <ListItemButton component={Link} to="/registrar" onClick={handleClose}>
          <ListItemIcon>
            <TaskIcon/>
          </ListItemIcon>
          <ListItemText primary="Administrar" />
        </ListItemButton>
      </ListItem> : null}
    
      {user && user.tipo === 'a' ? <ListItem disablePadding>
        <ListItemButton component={Link} to="/missolicitudes" onClick={handleClose}>
          <ListItemIcon>
            <ContactPageIcon/>
          </ListItemIcon>
          <ListItemText primary="Mis Solicitudes" />
        </ListItemButton>
      </ListItem>
      : null}
      {user && user.tipo === 'a' ? <ListItem disablePadding>
        <ListItemButton component={Link} to="/misinvitaciones" onClick={handleClose}>
          <ListItemIcon>
            <EmailIcon/>
          </ListItemIcon>
          <ListItemText primary="Mis invitaciones" />
        </ListItemButton>
      </ListItem>
      : null}
     
    </Drawer>
  );
}
export default MiniDrawer;
