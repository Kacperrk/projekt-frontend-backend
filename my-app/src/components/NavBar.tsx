import React, { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, Box, useTheme, useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = () => setOpen(!open);

  const links = [
    { to: '/', label: 'Książki' },
    { to: '/cart', label: 'Koszyk' },
    { to: '/profile', label: 'Profil' },
    { to: '/admin', label: 'Admin' },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile ? (
          <>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={open} onClose={toggleDrawer}>
              <List>
                {links.map(link => (
                  <ListItem button component={Link} to={link.to} key={link.to} onClick={toggleDrawer}>
                    <ListItemText primary={link.label} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Księgarnia
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Księgarnia
            </Typography>
            {links.map(link => (
              <Button color="inherit" component={Link} to={link.to} key={link.to}>
                {link.label}
              </Button>
            ))}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
