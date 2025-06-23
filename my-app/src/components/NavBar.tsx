import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { logout } from '../slices/authSlice';

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const isAuthenticated = token !== null;
  const isAdmin = user?.role === 'ADMIN';

  const toggleDrawer = () => setOpen(!open);
  const handleLogout = () => dispatch(logout());

  const links = [
    { to: '/', label: 'Książki', auth: false },
    { to: '/cart', label: 'Koszyk', auth: true },
    // { to: '/profile', label: 'Profil', auth: true },
    { to: '/admin', label: 'Admin', auth: true, admin: true },
  ];

  const renderLinks = () =>
    links
      .filter((link) => {
        if (link.auth && !isAuthenticated) return false;
        if (link.admin && !isAdmin) return false;
        return true;
      })
      .map((link) => (
        <Button
          key={link.to}
          component={Link}
          to={link.to}
          color="inherit"
          onClick={isMobile ? toggleDrawer : undefined}
        >
          {link.label}
        </Button>
      ));

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile ? (
          <>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Księgarnia
            </Typography>
            <Drawer anchor="left" open={open} onClose={toggleDrawer}>
              <List>
                {renderLinks().map((btn, idx) => (
                  <ListItem key={idx}>{btn}</ListItem>
                ))}
                {!isAuthenticated ? (
                  <>
                    <ListItem button component={Link} to="/login" onClick={toggleDrawer}>
                      <ListItemText primary="Zaloguj" />
                    </ListItem>
                    <ListItem button component={Link} to="/register" onClick={toggleDrawer}>
                      <ListItemText primary="Zarejestruj się" />
                    </ListItem>
                  </>
                ) : (
                  <ListItem button onClick={() => { handleLogout(); toggleDrawer(); }}>
                    <ListItemText primary="Wyloguj się" />
                  </ListItem>
                )}
              </List>
            </Drawer>
          </>
        ) : (
          <>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Księgarnia
            </Typography>
            {renderLinks()}
            {!isAuthenticated ? (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Zaloguj
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Zarejestruj się
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={handleLogout}>
                Wyloguj się
              </Button>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
