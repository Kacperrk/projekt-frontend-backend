import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PrivateRoute from '../components/PrivateRoute';

const mockStore = configureStore([]);

describe('PrivateRoute', () => {
  test(' pozwala na dostęp gdy użytkownik jest zalogowany', () => {
    const store = mockStore({
      auth: { token: 'abc123', user: { role: 'USER' } },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route
              path="/private"
              element={
                <PrivateRoute>
                  <div>Dostępne tylko dla zalogowanych</div>
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Dostępne tylko dla zalogowanych')).toBeInTheDocument();
  });

  test(' przekierowuje na /login gdy użytkownik NIE jest zalogowany', () => {
    const store = mockStore({
      auth: { token: null },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route
              path="/private"
              element={
                <PrivateRoute>
                  <div>Dostępne tylko dla zalogowanych</div>
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<div>Strona logowania</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Strona logowania')).toBeInTheDocument();
  });

  test(' przekierowuje na / gdy użytkownik NIE ma wymaganej roli', () => {
    const store = mockStore({
      auth: {
        token: 'abc123',
        user: { role: 'USER' }, // oczekiwano ADMIN
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route
              path="/admin"
              element={
                <PrivateRoute requiredRole="ADMIN">
                  <div>Panel administratora</div>
                </PrivateRoute>
              }
            />
            <Route path="/" element={<div>Strona główna</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Strona główna')).toBeInTheDocument();
  });
});
