import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

// MOCK AXIOS z interceptors
jest.mock('axios', () => {
  return {
    create: () => ({
      post: jest.fn(() => Promise.resolve({ data: { token: 'mock-token' } })),
      interceptors: {
        response: {
          use: jest.fn()
        }
      }
    })
  };
});

import LoginPage from '../components/LoginPage';

const mockStore = configureStore([]);

describe('LoginPage', () => {
  test('renderuje formularz logowania', () => {
    const store = mockStore({
      auth: { token: null, user: null }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hasło/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /zaloguj/i })).toBeInTheDocument();
  });

  test('pozwala wpisać dane i kliknąć zaloguj', async () => {
    const user = userEvent.setup(); // <-- działa tylko w wersji 14+
    const store = mockStore({
      auth: { token: null, user: null }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/hasło/i);
    const loginButton = screen.getByRole('button', { name: /zaloguj/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'haslo123');
    await user.click(loginButton);

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('haslo123');
  });
});
