import NavBar from '.';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';

describe('Nav bar', () => {
  it('Renders a nav element', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/' }]}>
        <NavBar />
      </MemoryRouter>,
    );
    expect(screen.getByRole('navigation')).toBeDefined();
  });
});
