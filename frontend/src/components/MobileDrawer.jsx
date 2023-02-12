import { useContext } from 'react';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PanoramaIcon from '@mui/icons-material/Panorama';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import TaskIcon from '@mui/icons-material/Task';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import useAuth from '../hooks/useAuth';
import {Avatar , Box } from '@mui/material'




export default function MobileDrawer({mobileOpen, handleMobileClose}){

    const { user } = useAuth();

    
    const drawer = (
        <div>
         <Toolbar
        sx={{
          marginTop: 8,
        }}
      >
        <ListItemIcon
          sx={{
            marginLeft: -1,
          }}
        >
          <SettingsIcon />
        </ListItemIcon>
        {user && user.tipo === 'd' ? <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Box component={Link} to={`/miperfil/${user.user_id}`} onClick={handleMobileClose} sx={{margin:0, flexShrink: 0, textDecoration: 'none', color: '#4e4e4e', fontSize: 18, display: 'flex', alignItems: 'center'}}>
        <Avatar sizes='small' sx={{marginRight: 1, backgroundColor: user.color ,width: 30, height: 30}} >{user.email.slice(0,1).toUpperCase()}</Avatar>
        <Typography> {user.email}</Typography>
        </Box>
        </Box> : <Typography> Administrar </Typography>}
        
      </Toolbar>
     
      
          <Divider />
          <List>
          <ListItem disablePadding>
        <ListItemButton component={Link} to="/" onClick={handleMobileClose}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItemButton>
      </ListItem>
      {user && user.tipo === 'd' ? <ListItem disablePadding>
        <ListItemButton component={Link} to="/agenda" onClick={handleMobileClose}>
          <ListItemIcon>
            < CalendarMonthIcon/>
          </ListItemIcon>
          <ListItemText primary="Agenda" onClick={handleMobileClose} />
        </ListItemButton>
      </ListItem> : null }
     
      {user && user.tipo === 'd' ?
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/solicitudes" onClick={handleMobileClose}>
          <ListItemIcon>
            <TaskIcon/>
          </ListItemIcon>
          <ListItemText primary="Solicitudes"/>
        </ListItemButton>
      </ListItem>: null }
      {user && user.tipo === 'd' ?
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/banners" onClick={handleMobileClose}>
          <ListItemIcon>
            <PanoramaIcon/>
          </ListItemIcon>
          <ListItemText primary="Banners Home" />
        </ListItemButton>
      </ListItem>: null }
      
      {user && user.tipo === 'a' ? <ListItem disablePadding>
        <ListItemButton component={Link} to="/missolicitudes" onClick={handleMobileClose}>
          <ListItemIcon>
            <ContactPageIcon/>
          </ListItemIcon>
          <ListItemText primary="Mis Solicitudes" />
        </ListItemButton>
      </ListItem>
      : null}
        
          </List>
          <Divider />
          
        </div>
      );




    return  (
    <Drawer

    variant="temporary"
    open={mobileOpen}
    ModalProps={{
      keepMounted: true, // Better open performance on mobile.
    }}
    sx={{
      display: { xs: 'block', md: 'block' },
      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100vw' },
    }}
  >
    {drawer}
    </Drawer>
    )

}