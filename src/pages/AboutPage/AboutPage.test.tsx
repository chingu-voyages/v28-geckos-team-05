import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutPage from './AboutPage';

describe('Render tests', () => {
  test('renders about H2', () => {
    render(<AboutPage />);
    const aboutH2 = screen.getByText(/about/i);

    expect(aboutH2).toBeInTheDocument();
  });

  test('renders disclaimer H2', () => {
    render(<AboutPage />);
    const disclaimerH2 = screen.getByText(/disclaimer/i);

    expect(disclaimerH2).toBeInTheDocument();
  });
});
