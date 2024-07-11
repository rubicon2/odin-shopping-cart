import { MemoryRouter } from 'react-router';
import DesktopNavBar from '.';
import { render, screen } from '@testing-library/react';

const links = [
  {
    to: '/film',
    innerText: 'Film',
  },
  {
    to: '/digital',
    innerText: 'Digital',
  },
];

function createRenderItems(links) {
  return (
    <MemoryRouter initialEntries={[{ pathname: '/' }]}>
      <DesktopNavBar links={links} />
    </MemoryRouter>
  );
}

describe('Desktop nav bar', () => {
  it('Renders a list', () => {
    render(createRenderItems([]));
    expect(screen.getByRole('list')).toBeDefined();
  });

  describe('Renders the correct number of list items', () => {
    it('Renders two items when given an array of two items', () => {
      render(createRenderItems(links));
      expect(screen.getAllByRole('listitem').length).toBe(2);
    });

    it('Renders six items when given an array of six items', () => {
      const links = [
        {
          to: '/film',
          innerText: 'Film',
        },
        {
          to: '/digital',
          innerText: 'Digital',
        },
        {
          to: '/turnips',
          innerText: 'Turnips',
        },
        {
          to: '/swedes',
          innerText: 'Swedes',
        },
        {
          to: '/custardcreams',
          innerText: 'Custard Creams',
        },
        {
          to: '/tennis',
          innerText: 'Tennis',
        },
      ];
      render(createRenderItems(links));
      expect(screen.getAllByRole('listitem').length).toBe(6);
    });

    it('Renders a link for each list item provided in the links prop array', () => {
      render(createRenderItems(links));
      expect(screen.getAllByTestId('generated-link').length).toBe(2);
    });

    it('Renders a link to the basket route', () => {
      render(createRenderItems(links));
      expect(screen.getByLabelText(/basket/i)).toBeDefined();
    });
  });
});
