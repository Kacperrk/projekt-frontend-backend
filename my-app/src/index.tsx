import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './store';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';


import { GoogleOAuthProvider } from '@react-oauth/google';


const clientId = '266757404347-748u7278fea2csr4rfh94pvmavl7tah3.apps.googleusercontent.com';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
      <React.StrictMode>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <BrowserRouter>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
              </ThemeProvider>
            </BrowserRouter>
          </Provider>
        </GoogleOAuthProvider>
      </React.StrictMode>
  );
}
