import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';

import RegisterPage from '../components/RegisterPage';

jest.mock('axios', () => {
  return {
    __esModule: true,
    default: {
      create: () => ({
        interceptors: { response: { use: jest.fn() } },
        post: jest.fn(() => Promise.resolve({ data: {} })),
      }),
    },
  };
});

const mockStore = configureStore([]);

describe('RegisterPage', () => {
  test('renderuje formularz rejestracji', () => {
    const store = mockStore({ auth: { user: null, token: null } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/nazwa użytkownika/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hasło/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /zarejestruj/i })).toBeInTheDocument();
  });

  test('pozwala wpisać dane i kliknąć zarejestruj', async () => {
    const user = userEvent.setup();
    const store = mockStore({ auth: { user: null, token: null } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByLabelText(/nazwa użytkownika/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/hasło/i);
    const registerButton = screen.getByRole('button', { name: /zarejestruj/i });

    await user.type(usernameInput, 'user123');
    await user.type(emailInput, 'user@example.com');
    await user.type(passwordInput, 'haslo123');
    await user.click(registerButton);

    expect(usernameInput).toHaveValue('user123');
    expect(emailInput).toHaveValue('user@example.com');
    expect(passwordInput).toHaveValue('haslo123');
  });
});
