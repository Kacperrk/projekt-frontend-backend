// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';
//
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// prosty smoke test – sprawdza czy komponent się renderuje
test('renders app without crashing', () => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );

    // możesz sprawdzić jakiś tekst który jest zawsze widoczny
    const header = screen.getByText(/Księgarnia/i);
    expect(header).toBeInTheDocument();
});
