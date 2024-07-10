import Header from '.';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

describe('Header', () => {
  it('Renders an element of type header', () => {
    // As header subcomponents include links which use useLocation hook, must wrap in MemoryRouter as the usual BrowserRouter is not present
    render(
      <MemoryRouter initialEntries={[{ pathname: '/' }]}>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByRole('banner')).toBeDefined();
  });

  it('Renders company logo', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/' }]}>
        <Header />
      </MemoryRouter>,
    );
    // Get all as logo is rendered more than once, but one or the other is hidden depending on viewport width. Is there a way to test this behaviour?
    expect(screen.getAllByAltText(/mega shop/i)).toBeDefined();
  });
});
